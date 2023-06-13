import styled from 'styled-components';

export const Input = styled.input`
  border: green solid 1px;
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
