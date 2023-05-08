import styled from "styled-components";

export const WrapperDiv = styled.div`
  display: flex;
  border: 1.5px solid black;
  flex-direction: column;
  border-radius: 5%;
  box-shadow: 0px 0px 20px -5px rgba(66, 68, 90, 1);
  background-color: #f5f5f5;
  transition: 0.2s all ease-in;

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
  color: #615858;
`;
