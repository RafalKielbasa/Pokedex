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
import { useAddToFavMutation } from "../../../hooks/useAddToFav";
import { useFavoritesQuery } from "../../../hooks/useFavorites";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useDeleteFromFavMutation } from "../../../hooks/useDeleteFromFav";

export const PokemonDetailsWrapper = ({ pokemonData }) => {
  const user = useContext(UserContext);
  const { name, height, baseExperience, weight, abilities, image, id } =
    pokemonData[0];
  const { data: allFavorites } = useFavoritesQuery(user?.id);
  const { mutate: deleteFromFavorites } = useDeleteFromFavMutation();
  const { mutate: addToFav } = useAddToFavMutation(user?.id);
  const checkIfPokemonIsInFav = allFavorites?.findIndex((e) => e.id === id);

  console.log(checkIfPokemonIsInFav);
  const handleFavClick = () => {
    if (checkIfPokemonIsInFav < 0) {
      addToFav(id);
    } else {
      deleteFromFavorites(id);
    }
  };

  return (
    <PageWrapper>
      <Header>
        <DetailsSign>Pokemon Details</DetailsSign>
        <IconsDiv>
          <FavIcon
            color={checkIfPokemonIsInFav < 0 ? "black" : "red"}
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
