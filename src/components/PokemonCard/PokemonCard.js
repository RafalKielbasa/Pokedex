import { Link } from 'react-router-dom';
import {
  Body,
  Container,
  PropsDiv,
  WrapperDiv,
  PokemonName,
  PokemonPropName,
  PokemonPropValue,
  PokemonPlace,
  DeleteButton,
} from './PokemonCard.styles';
import { ProjectUrl } from '../../const/ProjectUrl';
import CloseIcon from '@mui/icons-material/Close';
import useLocalStorage from 'use-local-storage';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const PokemonCard = ({
  props,
  sortedPokemon,
  isSort,
  isInArena,
  loser,
}) => {
  const { currentTheme } = useContext(ThemeContext);

  const { name, height, baseExperience, weight, abilities, image, id } = props;
  const [fighter, setFighter] = useLocalStorage('fighter');

  const handleDeleteButton = () => {
    const updatedFighter = [...fighter];

    if (updatedFighter.includes(id)) {
      updatedFighter.splice(updatedFighter.indexOf(id), 1);
    } else {
      if (updatedFighter.length < 2) {
        updatedFighter.push(id);
      }
    }

    setFighter(updatedFighter);
  };

  return (
    <WrapperDiv loser={loser} theme={currentTheme}>
      <PokemonPlace>
        {isInArena ? (
          <DeleteButton
            onClick={() => {
              handleDeleteButton();
            }}
          >
            <CloseIcon />
          </DeleteButton>
        ) : null}
        {isSort ? sortedPokemon?.indexOf(props) + 1 : null}
      </PokemonPlace>
      <img
        style={{ width: 200, margin: 'auto' }}
        src={image}
        alt={`${name} pokemon`}
      ></img>

      <Body>
        <PokemonName>
          <Link to={`${ProjectUrl.PokemonDetails}?name=${name}`}>{name}</Link>
        </PokemonName>
        <Container>
          <PropsDiv>
            <PokemonPropName>Height</PokemonPropName>
            <PokemonPropValue theme={currentTheme}>{height}</PokemonPropValue>
          </PropsDiv>
          <PropsDiv>
            <PokemonPropName>Base Experience</PokemonPropName>
            <PokemonPropValue theme={currentTheme}>
              {baseExperience}
            </PokemonPropValue>
          </PropsDiv>
          <PropsDiv>
            <PokemonPropName>Weight</PokemonPropName>
            <PokemonPropValue theme={currentTheme}>{weight}</PokemonPropValue>
          </PropsDiv>
          <PropsDiv>
            <PokemonPropName>Ability</PokemonPropName>
            <PokemonPropValue theme={currentTheme}>
              {Array.isArray(abilities) ? abilities[0] : abilities}
            </PokemonPropValue>
          </PropsDiv>
        </Container>
      </Body>
    </WrapperDiv>
  );
};
