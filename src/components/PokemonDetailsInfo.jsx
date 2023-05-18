import styled, { css } from "styled-components";

const InfoContainer = styled("div")(
  css`
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    @media screen and (max-width: 600px) {
      margin: 0px;
      padding: 0px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  `
);

const InfoBox = styled("div")(
  css`
    margin: 0;
    padding: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 600px) {
      margin: 0;
      padding: 0;
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `
);

const MiniTitle = styled("span")(
  css`
    font-size: 15px;
    font-family: sans-serif;
    font-weight: lighter;
    @media screen and (max-width: 600px) {
      font-size: 12px;
    }

    font-size: 20px;
    font-family: "Courier New";
    font-weight: bold;
    @media screen and (max-width: 600px) {
      font-size: 15px;
    }
  `
);

const BigTitle = styled("span")(
  css`
    font-size: 15px;
    font-family: sans-serif;
    font-weight: lighter;
    @media screen and (max-width: 600px) {
      font-size: 12px;
    }
  `
);

const PokemonDetailsInfo = ({ pokemonData }) => {
  return (
    <InfoContainer>
      <InfoBox>
        <BigTitle>weight</BigTitle>
        <MiniTitle>{pokemonData?.weight}</MiniTitle>
      </InfoBox>
      <InfoBox>
        <BigTitle>abilitie</BigTitle>
        <MiniTitle>{pokemonData?.ability}</MiniTitle>
      </InfoBox>
      <InfoBox>
        <BigTitle>height</BigTitle>
        <MiniTitle>{pokemonData?.height}</MiniTitle>
      </InfoBox>
      <InfoBox>
        <BigTitle>base experience</BigTitle>
        <MiniTitle>{pokemonData?.base_experience}</MiniTitle>
      </InfoBox>
    </InfoContainer>
  );
};

export default PokemonDetailsInfo;
