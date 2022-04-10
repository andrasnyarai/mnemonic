import styled, { keyframes } from 'styled-components';

const gradient = keyframes`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
`;
export const GradientText = styled.h1`
  animation: ${gradient} 5s ease-in-out infinite;
  background: linear-gradient(to right, #e64d62, #f2b2ba, #298ca2, #042a33);
  background-size: 300%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
`;
