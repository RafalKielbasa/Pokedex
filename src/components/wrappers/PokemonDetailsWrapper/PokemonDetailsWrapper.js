import { Button } from "@mui/material";
import { ProjectUrl } from "../../../const/ProjectUrl";
import {
  Container,
  DetailsSign,
  PageWrapper,
  PokedexSign,
  PokemonDetailsWrap,
  PokemonImg,
  PokemonInfo,
  PokemonName,
  PropsDiv,
  PropsName,
  PropsValue,
} from "./PokemonDetailsWrapper.style";

export const PokemonDetailsWrapper = ({ pokemonData }) => {
  const { name, height, baseExperience, weight, abilities, image } =
    pokemonData[0];

  return (
    <PageWrapper>
      <DetailsSign>Pokemon Details</DetailsSign>
      <PokedexSign>POKEDEX</PokedexSign>
      <PokemonDetailsWrap>
        <PokemonImg src={image} alt={`pokemon ${name}`}></PokemonImg>
        <PokemonInfo>
          <PokemonName>{name}</PokemonName>
          <Container>
            <PropsDiv>
              <PropsName>Height</PropsName>
              <PropsValue>{height}</PropsValue>
            </PropsDiv>
            <PropsDiv>
              <PropsName>Base Experience</PropsName>
              <PropsValue>{baseExperience}</PropsValue>
            </PropsDiv>
            <PropsDiv>
              <PropsName>Weight</PropsName>
              <PropsValue>{weight}</PropsValue>
            </PropsDiv>
            <PropsDiv>
              <PropsName>Ability</PropsName>
              <PropsValue>{abilities[0]}</PropsValue>
            </PropsDiv>
          </Container>
        </PokemonInfo>
      </PokemonDetailsWrap>

      <Button href={ProjectUrl.Home} variant="outlined" fullWidth>
        Back to homepage
      </Button>
    </PageWrapper>
  );
};
