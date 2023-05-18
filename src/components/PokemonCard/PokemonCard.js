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

  const capitalizeFirstLetter = (name) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return capitalized;
  };

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
            <Link props={props} to={`${ProjectUrl.Edit}?name=${name}`}>
              {capitalizeFirstLetter(name)}
            </Link>
          ) : (
            <Link
              props={props}
              to={`${ProjectUrl.PokemonDetails}?name=${name}`}
            >
              {capitalizeFirstLetter(name)}
            </Link>
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
