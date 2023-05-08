import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { ProjectUrl } from "../../../const/ProjectUrl";
import {
  Container,
  DetailsSign,
  PageWrapper,
  PokedexSign,
  PokemonDetailsWrap,
  PokemonInfo,
  PropsDiv,
} from "./PokemonDetailsWrapper.style";

export const PokemonDetailsWrapper = (props) => {
  const { name, height, base_experience, weight, ability, img } = props;

  return (
    <PageWrapper>
      <DetailsSign>Pokemon Details</DetailsSign>
      <PokedexSign>POKEDEX</PokedexSign>
      <PokemonDetailsWrap>
        <img
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          }
        ></img>
        <PokemonInfo>
          <h2>Pokemon Name</h2>
          <Container>
            <PropsDiv>
              <span>name</span>
              <span>100</span>
            </PropsDiv>
            <PropsDiv>
              <span>name</span>
              <span>100</span>
            </PropsDiv>
            <PropsDiv>
              <span>name</span>
              <span>100</span>
            </PropsDiv>
            <PropsDiv>
              <span>name</span>
              <span>100</span>
            </PropsDiv>
          </Container>
        </PokemonInfo>
      </PokemonDetailsWrap>
      <Stack direction="row" spacing={2}>
        <Link to={ProjectUrl.HomePage}>
          <Button variant="outlined">Back to homepage</Button>
        </Link>
      </Stack>
    </PageWrapper>
  );
};
