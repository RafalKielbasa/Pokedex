import { Button } from '@mui/material';
import { ProjectUrl } from '../../../const/ProjectUrl';
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
} from './PokemonDetailsWrapper.style';
import { useAddToFavMutation } from '../../../hooks/useAddToFav';
import { useDeleteFromFavMutation } from '../../../hooks/useDeleteFromFav';
import { useAllFavoritesPokemonDataQuery } from '../../../hooks/useAllFavoritesPokemonData';

export const PokemonDetailsWrapper = ({ pokemonData }) => {
  const { name, height, baseExperience, weight, image, id } = pokemonData || {};
  const { data: favoritesPokemonData } = useAllFavoritesPokemonDataQuery();
  const { mutate: deleteFromFavorites } = useDeleteFromFavMutation();
  const { mutate: addToFav } = useAddToFavMutation();

  const pokemonIndexInFav = favoritesPokemonData?.findIndex(
    (pokemon) => pokemon.name === name
  );

  const handleFavClick = () => {
    if (pokemonIndexInFav < 0) {
      addToFav(pokemonData);
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
            color={pokemonIndexInFav < 0 ? 'black' : 'red'}
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
              <PropsValue>{pokemonData?.abilities[0]}</PropsValue>
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
