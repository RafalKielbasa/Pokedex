import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

import { Tooltip, css, styled } from "@mui/material";
import { useSnackbar } from "notistack";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SportsMmaRoundedIcon from "@mui/icons-material/SportsMmaRounded";

import PokemonDetailsInfo from "../components/PokemonDetailsInfo";
import { JsonPost } from "../api/JsonPost";
import { useFetchLocalApi } from "../hooks/useFetchLocalApi";

const Container = styled("div")(
  ({ theme }) =>
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: ${theme.palette.background.contrast};
      height: 100vh;
      transition: 500ms all;
    `
);

const Card = styled("div")(
  ({ theme }) =>
    css`
      max-width: 80vw;
      min-height: 50vh;
      margin: 20px;
      padding: 20px;
      background-color: ${theme.palette.background.default};
      border-radius: 10px;
      transition: 500ms all;
      &:hover {
        transform: scale(1.05);
      }
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      @media screen and (max-width: 600px) {
        flex-direction: column;
      }
    `
);

const ImageContainer = styled("div")(
  css`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 600px) {
      width: 100px;
      height: 100px;
    }
  `
);

const Image = styled("img")(
  css`
    width: 250px;
    height: 250px;
    @media screen and (max-width: 600px) {
      width: 100px;
      height: 100px;
    }
  `
);

const ContentContainer = styled("div")(
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  `
);

const TitleContainer = styled("div")(
  css`
    display: flex;
    align-items: center;
  `
);

const Title = styled("span")(
  css`
    font-size: 40px;
    font-weight: bold;
    margin: 0 auto;
  `
);

const HeartIcon = styled(FavoriteRoundedIcon)(
  ({ isToggled }) =>
    css`
      margin-left: 5px;
      cursor: pointer;
      color: ${isToggled ? "red" : "white"};
    `
);

const SportsIcon = styled(SportsMmaRoundedIcon)(
  ({ isToggledBattle }) =>
    css`
      margin-left: 5px;
      cursor: pointer;
      color: ${isToggledBattle ? "red" : "white"};
    `
);

const BackButton = styled("button")(
  css`
    border: 1px solid red;
    width: 20vw;
    padding: 5px;
    color: red;
    margin: 20px;
    cursor: pointer;
    font-size: 30px;
  `
);

const Details = () => {
  const location = useLocation();
  const pokemonData = location.state?.pokemonData;
  const [isToggled, setIsToggled] = useState(false);
  const [isToggledBattle, setIsToggledBattle] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { items: favorites } = useFetchLocalApi("favorites");
  const favoritesIds = favorites?.map((item) => item.id);

  const { items: battle } = useFetchLocalApi("battle");
  const battleIds = battle?.map((item) => item.id);

  useEffect(() => {
    setIsToggled(favoritesIds?.includes(pokemonData?.id));
    setIsToggledBattle(battleIds?.includes(pokemonData?.id));
  }, [favorites, battle]);

  const handleSnackBar = (text, type) => {
    enqueueSnackbar(text, { variant: type });
  };

  const handleHeartClick = () => {
    if (!isToggled && !favorites.includes(pokemonData?.id)) {
      JsonPost(pokemonData, "favorites");
      setIsToggled((prev) => !prev);
      handleSnackBar("Added to favorites", "success");
    } else {
      axios.delete(`http://localhost:3001/favorites/${pokemonData.id}`);
      setIsToggled((prev) => !prev);
      handleSnackBar("Deleted from favorites", "error");
    }
  };

  const handleBattleClick = () => {
    console.log(battle, battle.includes(pokemonData.name));

    if (
      battle.length > 1 &&
      !battle.includes(pokemonData.id) &&
      !isToggledBattle
    ) {
      handleSnackBar("Too much players", "error");
    } else if (!isToggledBattle) {
      JsonPost(pokemonData, "battle");
      JsonPost(pokemonData, "editedPokemon");

      setIsToggledBattle((prev) => !prev);
      handleSnackBar("Added to battle", "success");
    } else {
      axios.delete(`http://localhost:3001/battle/${pokemonData.id}`);
      setIsToggledBattle((prev) => !prev);
      handleSnackBar("Removed from battle", "error");
    }
  };

  return (
    <Container>
      <Card>
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

          <PokemonDetailsInfo pokemonData={pokemonData} />
        </ContentContainer>
      </Card>
      <Link to={"/"}>
        <BackButton>BACK HOME</BackButton>
      </Link>
    </Container>
  );
};
export default Details;
