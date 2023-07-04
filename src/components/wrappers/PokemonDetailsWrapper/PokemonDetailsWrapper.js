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
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';

export const PokemonDetailsWrapper = ({ pokemonData }) => {
  const { name, height, baseExperience, weight, image, id } = pokemonData || {};
  const { data: favoritesPokemonData } = useAllFavoritesPokemonDataQuery();
  const { mutate: deleteFromFavorites } = useDeleteFromFavMutation();
  const { mutate: addToFav } = useAddToFavMutation();
  const [fighter, setFighter] = useLocalStorage('fighter');
  const pokemonInLocalStorage = {};
  const { currentTheme, changeTheme } = useContext(ThemeContext);

  const pokemonIndexInFav = favoritesPokemonData?.findIndex(
    (pokemon) => pokemon.name === name
  );

  console.log(pokemonIndexInFav);
  console.log('111', favoritesPokemonData);

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
            isactive={pokemonIndexInFav < 0 ? 'false' : 'true'}
            theme={currentTheme}
            onClick={() => handleFavClick()}
          />
          <FightIcon
            isactive={pokemonInLocalStorage[id] ? 'true' : 'false'}
            theme={currentTheme}
            onClick={() => handleFightClick()}
          />
        </IconsDiv>
      </Header>
      <PokedexSign theme={currentTheme}>POKEDEX</PokedexSign>
      <PokemonDetailsWrap>
        <PokemonImg src={image} alt={`pokemon ${name}`}></PokemonImg>
        <PokemonInfo>
          <PokemonName theme={currentTheme}>{name}</PokemonName>
          <Container>
            <PropsDiv>
              <PropsName theme={currentTheme}>Height</PropsName>
              <PropsValue theme={currentTheme}>{height}</PropsValue>
            </PropsDiv>
            <PropsDiv>
              <PropsName theme={currentTheme}>Base Experience</PropsName>
              <PropsValue theme={currentTheme}>{baseExperience}</PropsValue>
            </PropsDiv>
            <PropsDiv>
              <PropsName theme={currentTheme}>Weight</PropsName>
              <PropsValue theme={currentTheme}>{weight}</PropsValue>
            </PropsDiv>
            <PropsDiv>
              <PropsName theme={currentTheme}>Ability</PropsName>
              <PropsValue theme={currentTheme}>
                {pokemonData?.abilities[0]}
              </PropsValue>
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
