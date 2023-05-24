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
import { addToFavorites, deleteFromFavorites } from "../../../services/api";
import { useCorrectFavPokemonQuery } from "../../../hooks/useCorrectFavPokemon";

export const PokemonDetailsWrapper = ({ pokemonData }) => {
  const { name, height, baseExperience, weight, abilities, image, id } =
    pokemonData[0];
  const { data, refetch } = useCorrectFavPokemonQuery(name);
  const [isFav, setIsFav] = useState();

  const handleFavClick = () => {
    if (data?.data?.length > 0) {
      setIsFav(false);
      deleteFromFavorites(pokemonData[0], id);
    } else {
      setIsFav(true);
      addToFavorites(pokemonData[0]);
    }
    refetch();
  };

  console.log(data?.data);

  return (
    <PageWrapper>
      <Header>
        <DetailsSign>Pokemon Details</DetailsSign>
        <IconsDiv>
          <FavIcon
            color={isFav ? "red" : "black"}
            onClick={() => handleFavClick()}
          />
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
