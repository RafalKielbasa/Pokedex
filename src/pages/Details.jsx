import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SportsMmaRoundedIcon from "@mui/icons-material/SportsMmaRounded";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PokemonCard = styled.div`
  max-width: 80vw;
  min-height: 30vh;
  margin: 2rem;
  background-color: blue;
  &:hover {
    transform: scale(1.01);
  }
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  margin-left: 50px;
  max-width: 100%;
  height: auto;
  aspect-ratio: 4/3;

  @media screen and (min-width: 600px) {
    aspect-ratio: 1/1;
  }
`;

const Image = styled.img`
  width: auto;
  max-width: 180px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
`;

const HeartIcon = styled(FavoriteRoundedIcon)`
  margin-left: 5px;
  color: ${({ isToggled }) => (isToggled ? "red" : "white")};
  cursor: pointer;
`;

const SportsIcon = styled(SportsMmaRoundedIcon)`
  margin-left: 5px;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const InfoBox = styled.div`
  margin: 0;
  padding: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MiniTitle = styled.span`
  font-size: 15px;
  font-family: cursive;
  font-weight: lighter;
`;

const BigTitle = styled.span`
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
`;

const BackButton = styled(Link)`
  border: 1px solid red;
  max-width: 80vw;
  text-align: center;
  color: red;
  margin: 1rem auto;
`;

export default function pokemonData({ favorites, setFavorites }) {
  const [isToggled, setIsToggled] = useState(false);
  const location = useLocation();
  const pokemonData = location.state?.pokemonData;

  useEffect(() => {
    const storedData = localStorage.getItem(`isToggled-${pokemonData.id}`);
    if (storedData) {
      setIsToggled(JSON.parse(storedData));
    }
  }, [isToggled]);

  const handleHeartClick = () => {
    if (isToggled === false && favorites.includes(pokemonData.name) === false) {
      setFavorites([...favorites, pokemonData.name]);
      setIsToggled(!isToggled);
      localStorage.setItem(
        `favorites`,
        JSON.stringify([...favorites, pokemonData.name])
      );
      localStorage.setItem(
        `isToggled-${pokemonData.id}`,
        JSON.stringify(!isToggled)
      );
    } else {
      setIsToggled(!isToggled);
      const filteredFavorites = favorites.filter((item) => {
        return item !== pokemonData.name;
      });
      localStorage.setItem(`favorites`, JSON.stringify(filteredFavorites));
      setFavorites(filteredFavorites);

      localStorage.setItem(
        `isToggled-${pokemonData.id}`,
        JSON.stringify(!isToggled)
      );
    }
  };
  return (
    <Container>
      <PokemonCard>
        <ImageContainer>
          <Image src={pokemonData?.sprites.other.dream_world.front_default} />
        </ImageContainer>
        <ContentContainer>
          <TitleContainer>
            <Title>{pokemonData?.name}</Title>
            <HeartIcon isToggled={isToggled} onClick={handleHeartClick} />
            <SportsIcon />
          </TitleContainer>

          <InfoContainer>
            <InfoBox>
              <MiniTitle>{pokemonData?.weight}</MiniTitle>
              <BigTitle>weight</BigTitle>
            </InfoBox>
            <InfoBox>
              <MiniTitle>
                {pokemonData?.abilities?.[0]?.ability?.name}
              </MiniTitle>
              <BigTitle>abilitie</BigTitle>
            </InfoBox>
            <InfoBox>
              <MiniTitle>{pokemonData?.height}</MiniTitle>
              <BigTitle>height</BigTitle>
            </InfoBox>
            <InfoBox>
              <MiniTitle>{pokemonData?.base_experience}</MiniTitle>
              <BigTitle>base experience</BigTitle>
            </InfoBox>
          </InfoContainer>
        </ContentContainer>
      </PokemonCard>
      <BackButton to={"/"}>do strony glownej</BackButton>
    </Container>
  );
}
