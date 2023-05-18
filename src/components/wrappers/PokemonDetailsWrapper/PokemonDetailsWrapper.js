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
  // const { name, height, baseExperience, weight, abilities, image } =
  //   pokemonData[0];
  console.log("poke", pokemonData);

  return (
    <PageWrapper>
      <DetailsSign>Pokemon Details</DetailsSign>
      <PokedexSign>POKEDEX</PokedexSign>
      <PokemonDetailsWrap>
        <PokemonImg alt={`pokemon`}></PokemonImg>
        <PokemonInfo>
          <PokemonName>{}</PokemonName>
          <Container>
            <PropsDiv>
              <PropsName>Height</PropsName>
              <PropsValue>{}</PropsValue>
            </PropsDiv>
            <PropsDiv>
              <PropsName>Base Experience</PropsName>
              <PropsValue>{}</PropsValue>
            </PropsDiv>
            <PropsDiv>
              <PropsName>Weight</PropsName>
              <PropsValue>{}</PropsValue>
            </PropsDiv>
            <PropsDiv>
              <PropsName>Ability</PropsName>
              <PropsValue>{}</PropsValue>
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
