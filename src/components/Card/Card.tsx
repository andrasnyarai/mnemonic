import React, { VFC } from 'react';
import { useSpring } from 'react-spring';

import * as S from './styled';

type Props = {
  id: string;
  isSelected: boolean;
  eliminiated: boolean;
  url: string;
  onClick: () => void;
};

export const Card: VFC<Props> = ({ isSelected, eliminiated, url, onClick }) => {
  const { transform, opacity } = useSpring({
    opacity: isSelected ? 1 : 0,
    transform: `perspective(1200px) rotateX(${isSelected ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <S.Wrapper
      onClick={onClick}
      style={{
        transform: eliminiated ? 'scale(0)' : 'scale(1)',
      }}
    >
      <S.CardFace
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
        }}
      />
      <S.CardFace
        style={{
          opacity,
          transform: transform.to((t) => `${t} rotateX(180deg)`),
          backgroundImage: `url("${url}")`,
        }}
      />
    </S.Wrapper>
  );
};
