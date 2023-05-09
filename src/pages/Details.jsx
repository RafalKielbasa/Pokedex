import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SportsMmaRoundedIcon from "@mui/icons-material/SportsMmaRounded";
import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "@mui/material";
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);

  function fetchData(setFavorites, setBattle) {
    setFavorites
      ? axios
          .get("http://localhost:3001/favorites")
          .then((response) =>
            setFavorites(response?.data?.map((item) => item.name))
          )
          .catch((error) => console.log(error))
      : null;

    setBattle
      ? axios
          .get("http://localhost:3001/battle")
          .then((response) => setBattle(response.data?.map((item) => item.id)))
          .catch((error) => console.log(error))
      : null;
  }

  useEffect(() => {
    fetchData(setFavorites, setBattle);
  }, []);

  useEffect(() => {
    setIsToggled(favorites?.includes(pokemonData?.name));
    setIsToggledBattle(battle?.includes(pokemonData?.id));
  }, [favorites, battle]);

  const handleClick = (text, type) => {
    enqueueSnackbar(text, { variant: type });
  };

  const handleHeartClick = () => {
    if (isToggled === false && favorites.includes(pokemonData.name) === false) {
      axios.post("http://localhost:3001/favorites", {
        id: pokemonData.id,
        sprite: pokemonData.sprites.other.dream_world.front_default,
        name: pokemonData.name,
        weight: pokemonData.weight,
        ability: pokemonData.abilities[0].ability.name,
        height: pokemonData.height,
        baseExperience: pokemonData.base_experience,
      });
      setIsToggled(!isToggled);
      handleClick("Added to favorites", "success");
    } else {
      axios.delete(`http://localhost:3001/favorites/${pokemonData.id}`);
      setIsToggled(!isToggled);
      handleClick("Deleted from favorites", "error");
    }
  };

  const handleBattleClick = () => {
    if (battle.length === 2 && battle.includes(pokemonData.id) === false) {
      console.log("za duzo na arenie");
    } else if (
      isToggledBattle === false &&
      battle.includes(pokemonData.name) === false
    ) {
      axios.post("http://localhost:3001/battle", {
        id: pokemonData.id,
        sprite: pokemonData.sprites.other.dream_world.front_default,
        name: pokemonData.name,
        weight: pokemonData.weight,
        ability: pokemonData.abilities[0].ability.name,
        height: pokemonData.height,
        baseExperience: pokemonData.base_experience,
      });
      setIsToggledBattle(!isToggledBattle);
      handleClick("Added to battle", "success");
    } else {
      axios.delete(`http://localhost:3001/battle/${pokemonData.id}`);
      setIsToggledBattle(!isToggledBattle);
      handleClick("Removed from battle", "error");
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
              title={isToggledBattle ? "Remove from battle" : "Add to battle"}
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
