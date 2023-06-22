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
} from './PokemonCard.styles';
import { ProjectUrl } from '../../const/ProjectUrl';

export const PokemonCard = ({ props, sortedPokemon, isSort }) => {
  const { name, height, baseExperience, weight, abilities, image } = props;

  return (
    <WrapperDiv>
      <PokemonPlace>
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
            <PokemonPropValue>{height}</PokemonPropValue>
          </PropsDiv>
          <PropsDiv>
            <PokemonPropName>Base Experience</PokemonPropName>
            <PokemonPropValue>{baseExperience}</PokemonPropValue>
          </PropsDiv>
          <PropsDiv>
            <PokemonPropName>Weight</PokemonPropName>
            <PokemonPropValue>{weight}</PokemonPropValue>
          </PropsDiv>
          <PropsDiv>
            <PokemonPropName>Ability</PokemonPropName>
            <PokemonPropValue>
              {Array.isArray(abilities) ? abilities[0] : abilities}
            </PokemonPropValue>
          </PropsDiv>
        </Container>
      </Body>
    </WrapperDiv>
  );
};
