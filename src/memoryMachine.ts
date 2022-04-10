import {
  assign,
  BaseActionObject,
  createMachine,
  DoneInvokeEvent,
  InterpreterFrom,
  ResolveTypegenMeta,
  ServiceMap,
  State,
  TypegenDisabled,
} from 'xstate';

export type GameContext = {
  currentPlayerIndex: number;
  players: { id: string; points: number }[];
  selectedCardIndexes: number[];
  cards: { id: string; url: string; eliminated: boolean }[];
};

export type GameEvent =
  | { type: 'START'; playersCount: number }
  | { type: 'SELECT'; selectedCardIndex: number };

export type GameTypeState =
  | { value: 'idle'; context: GameContext }
  | { value: 'loading'; context: GameContext }
  | { value: 'failure'; context: GameContext }
  | { value: 'gameLoop'; context: GameContext }
  | { value: 'comparing'; context: GameContext }
  | { value: 'match'; context: GameContext }
  | { value: 'mismatch'; context: GameContext };

export type SendFn = InterpreterFrom<typeof memoryMachine>['send'];

export type ServiceState = State<
  GameContext,
  GameEvent,
  any,
  GameTypeState,
  ResolveTypegenMeta<TypegenDisabled, GameEvent, BaseActionObject, ServiceMap>
>;

const fetchCat = async (): Promise<{ url: string; id: string }> => {
  const res = await fetch('https://api.thecatapi.com/v1/images/search?size=small');
  const [{ url, id }] = await res.json();
  return { url, id };
};

const playerSymbols = ['🦖', '🦒', '🦢', '🦔'];

export const memoryMachine = createMachine<GameContext, GameEvent, GameTypeState>(
  {
    id: 'memoryGame',
    initial: 'idle',
    context: {
      currentPlayerIndex: 0,
      players: [],
      selectedCardIndexes: [],
      cards: [],
    },
    states: {
      idle: {
        entry: assign({ currentPlayerIndex: 0 }),
        on: {
          START: {
            target: 'loading',
            actions: assign({
              players: (_, event) =>
                [...new Array(event.playersCount)].map((_, i) => ({
                  id: playerSymbols[i],
                  points: 0,
                })),
            }),
          },
        },
      },
      loading: {
        invoke: {
          src: 'fetchImages',
          onDone: {
            target: 'gameLoop',
            actions: assign({
              cards: (_, event: DoneInvokeEvent<{ id: string; url: string }[]>) => {
                const cards = event.data.map(({ id, url }) => ({
                  id,
                  url,
                  eliminated: false,
                }));
                return [...cards, ...cards]
                  .map((value) => ({ value, sort: Math.random() }))
                  .sort((a, b) => a.sort - b.sort)
                  .map(({ value }) => value);
              },
            }),
          },
          onError: {
            target: 'failure',
          },
        },
      },
      failure: {},
      gameLoop: {
        always: [
          { target: 'comparing', cond: 'isTwoCardsSelected' },
          { target: 'idle', cond: 'isGameEnded' },
        ],
        on: {
          SELECT: {
            actions: assign({
              selectedCardIndexes: (context, event) => {
                return context.selectedCardIndexes.concat(event.selectedCardIndex);
              },
            }),
          },
        },
      },
      comparing: {
        always: [
          { target: 'match', cond: 'isMatch' },
          { target: 'mismatch', cond: 'notMatch' },
        ],
      },
      mismatch: {
        after: {
          1000: {
            target: 'gameLoop',
            actions: assign<GameContext, GameEvent>({
              currentPlayerIndex: (context) =>
                (context.currentPlayerIndex + 1) % context.players.length,
              selectedCardIndexes: [],
            }),
          },
        },
      },
      match: {
        after: {
          750: {
            target: 'gameLoop',
            actions: assign<GameContext, GameEvent>({
              players: (context) => {
                const currentPlayer = context.players[context.currentPlayerIndex];
                currentPlayer.points++;

                return context.players;
              },
              cards: (context) =>
                context.cards.map(({ eliminated, ...rest }, i) => ({
                  ...rest,
                  eliminated: context.selectedCardIndexes.includes(i) || eliminated,
                })),
              selectedCardIndexes: [],
            }),
          },
        },
      },
    },
  },
  {
    guards: {
      isTwoCardsSelected: (context: GameContext) => {
        return context.selectedCardIndexes.length === 2;
      },
      isMatch: (context: GameContext) => {
        const [a, b] = context.selectedCardIndexes;
        return context.cards[a].id === context.cards[b].id;
      },
      notMatch: (context: GameContext) => {
        const [a, b] = context.selectedCardIndexes;
        return context.cards[a].id !== context.cards[b].id;
      },
      isGameEnded: (context: GameContext) => {
        return context.cards.every(({ eliminated }) => eliminated);
      },
    },
    services: {
      fetchImages: () => Promise.all([...new Array(9)].map(fetchCat)),
    },
  },
);
