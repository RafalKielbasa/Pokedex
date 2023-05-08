import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 48px;
`;

export const DetailsSign = styled.span`
  color: #00cc00;
  font-size: 16px;
`;

export const PokedexSign = styled.h1`
  font-size: 48px;
  font-weight: 600;
  display: flex;
  justify-content: center;
`;

export const PokemonDetailsWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PokemonInfo = styled.div`
  display: flex;
  flex-direction: column;
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
