import React, { useContext, VFC } from 'react';

import { ServiceContext } from '../../ServiceContext';
import { Card } from '../Card';
import * as S from './styled';

export const Cards: VFC = () => {
  const { state, send } = useContext(ServiceContext);

  return (
    <S.Wrapper>
      {state.context.cards.map(({ id, url, eliminated }, i) => {
        return (
          <Card
            key={`${id}-${i}`}
            id={id}
            url={url}
            eliminiated={eliminated}
            isSelected={state.context.selectedCardIndexes.includes(i)}
            onClick={() =>
              !state.context.selectedCardIndexes.includes(i) &&
              !eliminated &&
              send('SELECT', { selectedCardIndex: i })
            }
          />
        );
      })}
    </S.Wrapper>
  );
};
