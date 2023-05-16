import styled from "styled-components";

const StyledDetailsBox = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
`;

const StyledDetail = styled.div`
  margin: 0;
  padding: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledMiniTitle = styled.span`
  font-size: 12px;
  font-family: cursive;
  font-weight: lighter;
`;

const StyledBigTitle = styled.span`
  font-size: 16px;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
`;

const PokemonCardInfo = ({ pokemonData, flag }) => {
  return (
    <StyledDetailsBox>
      <StyledDetail>
        <StyledMiniTitle>{pokemonData?.weight}</StyledMiniTitle>
        <StyledBigTitle>weight</StyledBigTitle>
      </StyledDetail>
      <StyledDetail>
        <StyledMiniTitle>{pokemonData?.ability}</StyledMiniTitle>
        <StyledBigTitle>abilitie</StyledBigTitle>
      </StyledDetail>
      <StyledDetail>
        <StyledMiniTitle>{pokemonData?.height}</StyledMiniTitle>
        <StyledBigTitle>height</StyledBigTitle>
      </StyledDetail>
      <StyledDetail>
        <StyledMiniTitle>{pokemonData?.base_experience}</StyledMiniTitle>
        <StyledBigTitle>base experience</StyledBigTitle>
      </StyledDetail>
    </StyledDetailsBox>
  );
};

export default PokemonCardInfo;
