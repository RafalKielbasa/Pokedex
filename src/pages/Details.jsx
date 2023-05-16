import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useTheme } from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SportsMmaRoundedIcon from "@mui/icons-material/SportsMmaRounded";
import PokemonDetailsInfo from "../components/PokemonDetailsInfo";
import { JsonPost } from "../api/JsonPost";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.contrast};
  height: 100vh;
`;

const Card = styled.div`
  max-width: 80vw;
  min-height: 50vh;
  margin: 2rem;
  background-color: ${({ theme }) => theme.palette.background.default};

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
  width: 250px;
  height: 250px;
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

  margin: 0 auto;
`;

const HeartIcon = styled(FavoriteRoundedIcon)`
  margin-left: 5px;
  cursor: pointer;
  color: ${({ isToggled }) => (isToggled ? "red" : "white")};
`;

const SportsIcon = styled(SportsMmaRoundedIcon)`
  color: white;
  margin-left: 5px;
  cursor: pointer;
  color: ${({ isToggledBattle }) => (isToggledBattle ? "red" : "white")};
`;

const BackButton = styled(Link)`
  border: 1px solid red;
  width: 40vw;
  text-align: center;
  color: red;
  margin: 1rem auto;
`;

const Details = ({ favorites, setFavorites, battle, setBattle }) => {
  const location = useLocation();
  const pokemonData = location.state?.pokemonData;
  const [isToggled, setIsToggled] = useState(false);
  const [isToggledBattle, setIsToggledBattle] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  useEffect(() => {
    function fetchData() {
      axios
        .get("http://localhost:3001/favorites")
        .then((response) =>
          setFavorites(response?.data?.map((item) => item.name))
        )
        .catch((error) => console.log(error));

      axios
        .get("http://localhost:3001/battle")
        .then((response) => setBattle(response.data?.map((item) => item.name)))
        .catch((error) => console.log(error));
    }

    fetchData();
  }, []);

  useEffect(() => {
    setIsToggled(favorites?.includes(pokemonData?.name));
    setIsToggledBattle(battle?.includes(pokemonData?.name));
  }, [favorites, battle]);

  const handleClick = (text, type) => {
    enqueueSnackbar(text, { variant: type });
  };

  const handleHeartClick = () => {
    if (!isToggled && !favorites.includes(pokemonData?.id)) {
      JsonPost(pokemonData, "favorites");
      setIsToggled((prev) => !prev);
      handleClick("Added to favorites", "success");
    } else {
      axios.delete(`http://localhost:3001/favorites/${pokemonData.id}`);
      setIsToggled((prev) => !prev);
      handleClick("Deleted from favorites", "error");
    }
  };

  const handleBattleClick = () => {
    if (battle.includes(pokemonData.id)) {
      handleClick("Too much players", "error");
    } else if (!isToggledBattle && !battle.includes(pokemonData.id)) {
      JsonPost(pokemonData, "battle");
      JsonPost(pokemonData, "editedPokemon");

      setIsToggledBattle((prev) => !prev);
      handleClick("Added to battle", "success");
    } else {
      axios.delete(`http://localhost:3001/battle/${pokemonData.id}`);
      setIsToggledBattle((prev) => !prev);
      handleClick("Removed from battle", "error");
    }
  };

  return (
    <Container theme={theme}>
      <Card theme={theme}>
        <ImageContainer>
          <Image src={pokemonData?.sprite} />
        </ImageContainer>

        <ContentContainer>
          <TitleContainer>
            <Title>{pokemonData?.name}</Title>
            <Tooltip
              title={isToggled ? "Remove from favorites" : "Add to favorites"}
            >
              <HeartIcon onClick={handleHeartClick} isToggled={isToggled} />
            </Tooltip>
            <Tooltip
              title={isToggledBattle ? "Remove from battle" : "Add to battle"}
            >
              <SportsIcon
                onClick={handleBattleClick}
                isToggledBattle={isToggledBattle}
              />
            </Tooltip>
          </TitleContainer>

          <PokemonDetailsInfo pokemonData={pokemonData} flag={true} />
        </ContentContainer>
      </Card>
      <BackButton to={"/"}>do strony glownej</BackButton>
    </Container>
  );
};
export default Details;
