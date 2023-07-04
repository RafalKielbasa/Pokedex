import styled from 'styled-components';

export const WrapperDiv = styled.div`
  display: flex;
  border: ${({ theme }) => `solid 1.5px ${theme.borderColor}`};
  flex-direction: column;
  border-radius: 5%;
  box-shadow: 0px 0px 20px -5px rgba(66, 68, 90, 1);
  background-color: ${({ theme }) => theme.cardBgColor};
  transition: 0.2s all ease-in;
  color: ${({ theme }) => theme.fontColor};
  min-height: 414px;
  opacity: ${(props) => (props.loser ? 0.6 : 1)};

  &:hover {
    transform: scale(1.1);
  }
`;

export const Body = styled.div`
  padding: 12px;
`;

export const PropsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  text-align: center;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const PokemonName = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 24px;
  font-size: 32px;
  font-weight: 900;
  text-transform: capitalize;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const PokemonPropName = styled.span`
  font-size: 20px;
`;

export const PokemonPropValue = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.scFontColor};
`;

export const PokemonPlace = styled.h1`
  display: flex;
  justify-content: end;
  margin: 0;
  padding: 0;
`;

export const DeleteButton = styled.button`
  background-color: inherit;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;
