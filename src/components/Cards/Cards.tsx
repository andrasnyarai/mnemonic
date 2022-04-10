import React, { useContext, VFC } from 'react';
import { animated as a, useTrail } from 'react-spring';

import { ServiceContext } from '../../ServiceContext';
import { Card } from '../Card';
import * as S from './styled';

export const Cards: VFC = () => {
  const { state, send } = useContext(ServiceContext);
  const items = state.context.cards;

  const trail = useTrail(state.context.cards.length, {
    config: { mass: 15, tension: 500, friction: 200, duration: 50 },
    from: { opacity: 0, scale: 1.15 },
    to: { opacity: 1, scale: 1 },
  });

  return (
    <S.Wrapper>
      {trail.map((style, i) => {
        const { eliminated, id, url } = items[i];
        return (
          <a.div key={`${id}-${i}`} style={style}>
            <Card
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
          </a.div>
        );
      })}
    </S.Wrapper>
  );
};
