import React, { useContext, VFC } from 'react';

import { ServiceContext } from '../../ServiceContext';
import * as S from './styled';

export const Players: VFC = () => {
  const { state } = useContext(ServiceContext);
  return (
    <S.Wrapper>
      {state.context.players.map(({ id, points }, i) => {
        const isCurrentPlayer = state.context.currentPlayerIndex === i;

        return (
          <S.Player
            key={id}
            style={{
              backgroundColor:
                isCurrentPlayer && !state.matches('idle') ? 'lightgreen' : 'white',
              height: state.matches('idle') ? `calc(125px + ${points * 30}px)` : '125px',
              transform:
                isCurrentPlayer && state.matches('match') ? 'scale(1.5)' : 'scale(1)',
            }}
          >
            <div>{id}</div>
            <div>{points}</div>
          </S.Player>
        );
      })}
    </S.Wrapper>
  );
};
