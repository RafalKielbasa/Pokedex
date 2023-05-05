import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SportsMmaRoundedIcon from "@mui/icons-material/SportsMmaRounded";
import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PokemonCard = styled.div`
  max-width: 80vw;
  min-height: 50vh;
  margin: 2rem;

  &:hover {
    transform: scale(1.01);
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 600px) {
    width: 100px;
    height: 100px;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  @media screen and (max-width: 600px) {
    width: 100px;
    height: 100px;
  }
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
  font-size: 3rem;
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
  color: white;
  color: ${({ isToggledBattle }) => (isToggledBattle ? "red" : "white")};
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
  @media screen and (max-width: 600px) {
    margin: 0px;
    padding: 0px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

const InfoBox = styled.div`
  margin: 0;
  padding: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    margin: 0;
    padding: 0;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const MiniTitle = styled.span`
  font-size: 15px;
  font-family: cursive;
  font-weight: lighter;
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const BigTitle = styled.span`
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    font-size: 15px;
  }
`;

const BackButton = styled(Link)`
  border: 1px solid red;
  width: 40vw;
  text-align: center;
  color: red;
  margin: 1rem auto;
`;

export default function Details({
  favorites,
  setFavorites,
  battle,
  setBattle,
}) {
  const [isToggled, setIsToggled] = useState(false);
  const [isToggledBattle, setIsToggledBattle] = useState(false);
  const location = useLocation();
  const pokemonData = location.state?.pokemonData;

  const theme = useTheme();
  const colorMode = useContext(ThemeContext);

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

  const handleBattleClick = () => {
    if (battle.length >= 2) {
      console.log("za duzo graczy ");
    } else if (
      isToggledBattle === false &&
      battle.includes(pokemonData.name) === false
    ) {
      setBattle([...battle, pokemonData.name]);
      setIsToggledBattle(!isToggledBattle);
    } else {
      setIsToggledBattle(!isToggledBattle);
      const filteredBattle = battle.filter((item) => {
        return item !== pokemonData.name;
      });
    }
  };

  return (
    <Container
      style={{
        backgroundColor: theme.palette.background.contrast,
        height: "100vh",
      }}
    >
      <PokemonCard
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <ImageContainer>
          <Image src={pokemonData?.sprites.other.dream_world.front_default} />
        </ImageContainer>
        <ContentContainer>
          <TitleContainer>
            <Title>{pokemonData?.name}</Title>
            <Tooltip
              title={isToggled ? "Remove from favorites" : "Add to favorites"}
            >
              <HeartIcon isToggled={isToggled} onClick={handleHeartClick} />
            </Tooltip>
            <Tooltip
              title={isToggledBattle ? "Add to battle" : "Remove from battle"}
            >
              <SportsIcon
                isToggledBattle={isToggledBattle}
                onClick={handleBattleClick}
              />
            </Tooltip>
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
