import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor};
  opacity: 70%;
  min-height: 40vh;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 12px;
`;

export const H1 = styled.h1`
  color: ${({ theme }) => theme.fontColor};
`;
