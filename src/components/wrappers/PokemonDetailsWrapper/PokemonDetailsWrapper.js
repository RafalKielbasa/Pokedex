import { Button } from "@mui/material";
import { ProjectUrl } from "../../../const/ProjectUrl";
import {
  Container,
  DetailsSign,
  FavIcon,
  FightIcon,
  Header,
  IconsDiv,
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
import { useState } from "react";
import { addToFavorites, deleteToFavorites } from "../../../services/api";
import { useFavoritesQuery } from "../../../hooks/useFavorites";
import { useCorrectFavPokemonQuery } from "../../../hooks/useCorrectFavPokemon";

export const PokemonDetailsWrapper = ({ pokemonData }) => {
  const { name, height, baseExperience, weight, abilities, image, id } =
    pokemonData[0];
  const [defaultColor, setDefaultColor] = useState("black");
  const { data } = useCorrectFavPokemonQuery(name);

  console.log("favorites", data?.data);
  const handleFavClick = () => {
    if (data?.data.length === 0) {
      addToFavorites(pokemonData[0]);
    } else {
      deleteToFavorites(pokemonData[0], id);
    }
  };

  return (
    <PageWrapper>
      <Header>
        <DetailsSign>Pokemon Details</DetailsSign>
        <IconsDiv>
          <FavIcon defaultColor={defaultColor} onClick={handleFavClick} />
          <FightIcon />
        </IconsDiv>
      </Header>
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
