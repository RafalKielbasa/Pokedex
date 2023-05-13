import { Link, useLocation } from "react-router-dom";
import {
  Body,
  Container,
  PropsDiv,
  WrapperDiv,
  PokemonName,
  PokemonPropName,
  PokemonPropValue,
} from "./PokemonCard.styles";
import { ProjectUrl } from "../../const/ProjectUrl";

export const PokemonCard = (props) => {
  const { name, height, base_experience, weight, ability, img } = props;

  const location = useLocation();
  console.log(location.pathname);

  return (
    <WrapperDiv>
      <img
        src={
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        }
        alt={`${name} pokemon`}
      ></img>

      <Body>
        <PokemonName>
          {location.pathname === ProjectUrl.EditAndLogout ? (
            <Link to={`${ProjectUrl.Edit}?name=${name}`}>Pokemon</Link>
          ) : (
            <Link to={`${ProjectUrl.PokemonDetails}?name=${name}`}>
              Pokemon
            </Link>
          )}
        </PokemonName>
        <Container>
          <PropsDiv>
            <PokemonPropName>Height</PokemonPropName>
            <PokemonPropValue>100</PokemonPropValue>
          </PropsDiv>
          <PropsDiv>
            <PokemonPropName>Base Experience</PokemonPropName>
            <PokemonPropValue>100</PokemonPropValue>
          </PropsDiv>
          <PropsDiv>
            <PokemonPropName>Weight</PokemonPropName>
            <PokemonPropValue>100</PokemonPropValue>
          </PropsDiv>
          <PropsDiv>
            <PokemonPropName>Ability</PokemonPropName>
            <PokemonPropValue>100</PokemonPropValue>
          </PropsDiv>
        </Container>
      </Body>
    </WrapperDiv>
  );
};
