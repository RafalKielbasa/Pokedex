import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 48px;
`;

export const DetailsSign = styled.span`
  color: #00cc00;
  font-size: 24px;
  display: flex;
  justify-content: flex-start;
`;

export const PokedexSign = styled.h1`
  font-size: 48px;
  font-weight: 600;
  display: flex;
  justify-content: center;
`;

export const PokemonName = styled.h2`
  display: flex;
  justify-content: center;
`;

export const PokemonDetailsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const PokemonInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
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

export const PropsName = styled.span`
  font-size: 32px;
`;

export const PropsValue = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: #615858;
`;

export const PokemonImg = styled.img`
  width: 25%;
`;
