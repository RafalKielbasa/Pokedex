import styled from 'styled-components';

export const Input = styled.input`
  border: ${({ theme }) => theme.borderColor} solid 1px;
  color: ${({ theme }) => theme.fontColor};
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 20px;
  text-align: center;
  font-size: 24px;
`;
export const Label = styled.label`
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.fontColor};
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 48px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;
