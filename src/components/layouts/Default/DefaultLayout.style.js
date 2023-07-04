import styled from 'styled-components';

export const MainWrapper = styled.main`
  max-width: 1280px;
  padding: 0 20px;
  margin: 0 auto;
  width: 100%;
`;

export const AllPage = styled.div`
  position: fixed;
  overflow: scroll;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.backgroundColor};
`;
