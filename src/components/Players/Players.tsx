import React, { useContext, VFC } from 'react';

import { ServiceContext } from '../../ServiceContext';
import * as S from './styled';

export const Players: VFC = () => {
  const { state } = useContext(ServiceContext);
  return (
    <S.Wrapper>
      {state.context.players.map(({ id, points }, i) => {
        return (
          <S.Player
            key={id}
            style={{
              backgroundColor:
                state.context.currentPlayerIndex === i && !state.matches('idle')
                  ? 'lightgreen'
                  : 'white',
              height: state.matches('idle') ? `calc(125px + ${points * 30}px)` : '125px',
              transform:
                state.context.currentPlayerIndex === i && state.matches('match')
                  ? 'scale(1.5)'
                  : 'scale(1)',
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
