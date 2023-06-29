import styled from 'styled-components';

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
`;

export const SortButton = styled.button`
  font-size: 24px;
  color: #77d76d;
  border: 1px #77d76d solid;
  border-radius: 20px;
  width: 200px;
  background-color: ${(props) => (props.active ? '#F3F3F3' : 'inherit')};
  transition: 0.2s all ease-in;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;
