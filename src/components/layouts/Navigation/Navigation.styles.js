import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  align-items: center;

  h5 {
    color: ${({ theme }) => theme.fontColor};
  }
`;
