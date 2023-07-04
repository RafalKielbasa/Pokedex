import { Pagination, TextField } from '@mui/material';
import styled from 'styled-components';

export const PokemonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 32px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  align-items: center;
`;

export const PageWrapper = styled.div`
  padding: 40px 0px;
  padding-bottom: 120px;
`;

export const PaginationWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.fontColor};
`;

export const StyledPagination = styled(Pagination)`
  .MuiPaginationItem-root {
    color: ${({ theme }) => theme.fontColor};
    background-color: ${({ theme }) => theme.backgroundColor};

    &:hover {
      background-color: ${({ theme }) => theme.backgroundColor};
    }
  }
`;

export const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.borderColor};
  }
  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.borderColor};
  }

  && .MuiInputLabel-root {
    color: ${({ theme }) => theme.fontColor};
  }

  & {
    input {
      color: ${({ theme }) => theme.fontColor};
    }
  }
`;
