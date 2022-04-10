import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, var(--cardSize));
  grid-gap: 15px;
  justify-content: center;
  width: 100%;
  overflow: scroll;

  padding: 10% 5% 200px;
  @media only screen and (min-width: 700px) {
    padding: 10% 15% 200px;
  }
  @media only screen and (min-width: 1600px) {
    padding: 10% 25% 200px;
  }
`;
