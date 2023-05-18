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

export const PokemonCard = ({ props }) => {
  const { name, height, baseExperience, weight, abilities, image } = props;
  const location = useLocation();

  return (
    <WrapperDiv>
      <img
        style={{ width: 200, margin: "auto" }}
        src={image}
        alt={`${name} pokemon`}
      ></img>

      <Body>
        <PokemonName>
          {location.pathname === ProjectUrl.EditAndLogout ? (
            <Link to={`${ProjectUrl.Edit}?name=${name}`}>{name}</Link>
          ) : (
            <Link to={`${ProjectUrl.PokemonDetails}?name=${name}`}>{name}</Link>
          )}
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
            <PokemonPropValue>{abilities[0]}</PokemonPropValue>
          </PropsDiv>
        </Container>
      </Body>
    </WrapperDiv>
  );
};
