import React, { useContext, VFC } from 'react';

import { ServiceContext } from '../../ServiceContext';
import * as S from './styled';

export const Start: VFC = () => {
  const { send } = useContext(ServiceContext);

  return (
    <S.Wrapper>
      <b>Mnemonic 🎴</b>
      <div>How many of you want to play?</div>
      <S.ButtonHolder>
        {[1, 2, 3, 4].map((playersCount) => {
          return (
            <S.Button key={playersCount} onClick={() => send('START', { playersCount })}>
              {playersCount}
            </S.Button>
          );
        })}
      </S.ButtonHolder>
    </S.Wrapper>
  );
};
