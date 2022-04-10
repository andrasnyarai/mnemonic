import { animated as a } from 'react-spring';
import styled from 'styled-components';

export const Wrapper = styled.div`
  transition: transform 0.2s ease;
  transform-origin: center center;
  width: var(--cardSize);
  height: var(--cardSize);
`;

export const CardFace = styled(a.div)`
  position: absolute;
  width: var(--cardSize);
  height: var(--cardSize);
  cursor: pointer;
  will-change: transform, opacity;
  border-radius: 3px;
  backface-visibility: hidden;
  border: solid black 1px;
  background-blend-mode: normal;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: lightgrey;
`;
