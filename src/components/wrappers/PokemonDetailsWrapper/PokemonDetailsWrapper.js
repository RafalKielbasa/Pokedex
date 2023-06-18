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
import useLocalStorage from 'use-local-storage';

export const PokemonDetailsWrapper = ({ pokemonData }) => {
  const { name, height, baseExperience, weight, image, id } = pokemonData || {};
  const { data: favoritesPokemonData } = useAllFavoritesPokemonDataQuery();
  const { mutate: deleteFromFavorites } = useDeleteFromFavMutation();
  const { mutate: addToFav } = useAddToFavMutation();
  const [fighter, setFighter] = useLocalStorage('fighter');
  const pokemonInLocalStorage = {};

  const pokemonIndexInFav = favoritesPokemonData?.findIndex(
    (pokemon) => pokemon.name === name
  );

  if (Array.isArray(fighter)) {
    fighter.forEach((id) => {
      pokemonInLocalStorage[id] = true;
    });
  }

  const handleFavClick = () => {
    if (pokemonIndexInFav < 0) {
      addToFav(pokemonData);
    } else {
      deleteFromFavorites(id);
    }
  };

  const handleFightClick = () => {
    if (fighter === undefined || !Array.isArray(fighter)) {
      setFighter([id]);
    } else {
      const updatedFighter = [...fighter];

      if (updatedFighter.includes(id)) {
        updatedFighter.splice(updatedFighter.indexOf(id), 1);
      } else {
        if (updatedFighter.length < 2) {
          updatedFighter.push(id);
        }
      }

      setFighter(updatedFighter);
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
          <FightIcon
            color={pokemonInLocalStorage[id] ? 'gold' : 'black'}
            onClick={() => handleFightClick()}
          />
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
