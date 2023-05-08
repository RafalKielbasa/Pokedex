import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ProjectUrl } from "../../../const/ProjectUrl";
import {
  Container,
  DetailsSign,
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

export const PokemonDetailsWrapper = (props) => {
  const { name, height, base_experience, weight, ability, img } = props;

  return (
    <PageWrapper>
      <DetailsSign>Pokemon Details</DetailsSign>
      <PokedexSign>POKEDEX</PokedexSign>
      <PokemonDetailsWrap>
        <PokemonImg
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          }
          alt={`${name}`}
        ></PokemonImg>
        <PokemonInfo>
          <PokemonName>Pokemon Name</PokemonName>
          <Container>
            <PropsDiv>
              <PropsName>name</PropsName>
              <PropsValue>100</PropsValue>
            </PropsDiv>
            <PropsDiv>
              <PropsName>name</PropsName>
              <PropsValue>100</PropsValue>
            </PropsDiv>
            <PropsDiv>
              <PropsName>name</PropsName>
              <PropsValue>100</PropsValue>
            </PropsDiv>
            <PropsDiv>
              <PropsName>name</PropsName>
              <PropsValue>100</PropsValue>
            </PropsDiv>
          </Container>
        </PokemonInfo>
      </PokemonDetailsWrap>
      <Link to={ProjectUrl.HomePage}>
        <Button variant="outlined" fullWidth>
          Back to homepage
        </Button>
      </Link>
    </PageWrapper>
  );
};
