import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: end;
  width: 50%;
  font-size: 46px;
  position: absolute;
  bottom: 0;
`;

export const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px 15px 0 0;
  border: solid black 0.5px;
  padding: 5px;
  transition: transform 0.1s ease 0.3s, height 0.5s ease-out 0.3s;
  transform-origin: bottom;
`;
