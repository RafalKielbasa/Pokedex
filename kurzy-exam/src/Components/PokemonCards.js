import * as React from "react";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { GiCrossedSwords } from "react-icons/gi";
import { postData } from "src/api/postData";
import { bawpikachu } from "src/Images";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "src/context/AppContext";

const CardsWrapper = styled.div`
  margin: 20px;
`;
const FavIcon = styled(FavoriteIcon)`
  cursor: pointer;
`;
const BattleIcon = styled(GiCrossedSwords)`
  cursor: pointer;
  margin-right: 20px;
  font-size: 20px;
`;

export default function PokemonCard({
  id,
  pic,
  picDet,
  name,
  height,
  baseexp,
  weight,
  abilitie,
  wins,
  expFullPokemonDataFormated,
  onClick,
}) {
  const [favorites, setFavorites] = useState([]);
  const [favoritesIds, setFavoritesIds] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [battle, setBattle] = useState([]);
  const [battleIds, setBattleIds] = useState([]);
  const [isBattle, setIsBattle] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { toggleTheme, isDark } = useContext(AppContext);

  const navigate = useNavigate();
  const handleClick = () => {
    const path = "/details";
    navigate(path, {
      state: { id, expFullPokemonDataFormated, favorites, favoritesIds },
    });
  };

  useEffect(() => {
    const getFavorites = async () => {
      const response = await axios.get(`http://localhost:3001/favoriteData/`);
      setFavorites(response.data);
      const getFavoritesIds = response?.data?.map((item) => item.id);
      setFavoritesIds(getFavoritesIds);
    };
    getFavorites();
  }, [isFavorite]);

  useEffect(() => {
    setIsFavorite(favoritesIds.includes(id));
  }),
    [isFavorite];

  const handleFavorite = () => {
    if (!favoritesIds.includes(id)) {
      postData(
        "favoriteData",
        id,
        pic,
        picDet,
        name,
        height,
        baseexp,
        weight,
        abilitie,
        wins
      );
      enqueueSnackbar(`Pokemon ${name} został dodany do "Ulubionych"`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    } else {
      axios.delete(`http://localhost:3001/favoriteData/${id}`);
      enqueueSnackbar(`Pokemon ${name} został usunięty z "Ulubionych"`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    }
  };

  useEffect(() => {
    const getBattle = async () => {
      const response = await axios.get(`http://localhost:3001/battle/`);
      setBattle(response.data);
      const getBattleIds = response?.data?.map((item) => item.id);
      setBattleIds(getBattleIds);
    };
    getBattle();
  }, [isBattle]);

  useEffect(() => {
    setIsBattle(battleIds.includes(id));
  }),
    [battleIds];

  const handleBattle = () => {
    if (!battleIds.includes(id) && battle.length < 2) {
      postData(
        "battle",
        id,
        pic,
        picDet,
        name,
        height,
        baseexp,
        weight,
        abilitie,
        wins
      );
      enqueueSnackbar(`Pokemon ${name} poszedł walczyć na Arenę`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    } else if (!battleIds.includes(id) & (battle.length === 2)) {
      enqueueSnackbar(`Na Arenie mogą znajdować się tylko 2 pokemony`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    } else if (battleIds.includes(id)) {
      axios.delete(`http://localhost:3001/battle/${id}`);
      enqueueSnackbar(`Pokemon ${name} został usunięty z Areny`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    }
  };

  return (
    <CardsWrapper>
      <Card
        style={{
          backgroundColor: isDark ? "#bcaaa4" : "white",
          width: 320,
          "&:hover": {
            transform: "scale(1.10)",
          },
        }}
        onClick={onClick}
      >
        <CardActionArea onClick={handleClick}>
          <CardMedia style={{ textAlign: "center" }}>
            <img src={pic} alt={"picture"} key={id} />
          </CardMedia>

          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ textAlign: "center" }}
          >
            {name}
          </Typography>

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {height}
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", paddingBottom: "20px" }}
                variant="body2"
                color="text.secondary"
              >
                Height
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {baseexp}
              </Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="body2"
                color="text.secondary"
              >
                Base experience
              </Typography>
            </CardContent>

            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {weight}
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", paddingBottom: "20px" }}
                variant="body2"
                color="text.secondary"
              >
                Weight
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {abilitie}
              </Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="body2"
                color="text.secondary"
              >
                Abilitie
              </Typography>
            </CardContent>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <BattleIcon
            onClick={() => {
              handleBattle();
              setIsBattle((prev) => !prev);
            }}
            style={{ color: isBattle ? "red" : "grey" }}
          />
          <FavIcon
            onClick={() => {
              handleFavorite();
              setIsFavorite((prev) => !prev);
            }}
            style={{
              color: isFavorite ? "red" : "grey",
            }}
          />
        </CardActions>
      </Card>
    </CardsWrapper>
  );
}

export function ArenaPokemonCard({
  id,
  pic,
  name,
  height,
  baseexp,
  weight,
  abilitie,
  wins,
}) {
  const { toggleTheme, isDark } = useContext(AppContext);

  return (
    <CardsWrapper>
      <Card
        style={{
          backgroundColor: isDark ? "#bcaaa4" : "white",
          width: 320,
        }}
      >
        <CardMedia style={{ textAlign: "center" }}>
          <img src={pic} alt={"picture"} key={id} />
        </CardMedia>

        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ textAlign: "center" }}
        >
          {name}
        </Typography>

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {height}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold", paddingBottom: "20px" }}
              variant="body2"
              color="text.secondary"
            >
              Height
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {baseexp}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="body2"
              color="text.secondary"
            >
              Base experience
            </Typography>
          </CardContent>

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {weight}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold", paddingBottom: "20px" }}
              variant="body2"
              color="text.secondary"
            >
              Weight
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {abilitie}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="body2"
              color="text.secondary"
            >
              Abilitie
            </Typography>
          </CardContent>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        ></CardActions>
      </Card>
    </CardsWrapper>
  );
}

export function BlankPokemonCard() {
  const { toggleTheme, isDark } = useContext(AppContext);

  return (
    <CardsWrapper>
      <Card
        style={{
          backgroundColor: isDark ? "#bcaaa4" : "white",
          width: 320,
          height: 330,
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              textAlign: "center",
            }}
            variant="body2"
            color="text.secondary"
          >
            Miejsce na walczącego pokemona
          </Typography>
          <img sx={{ marginBottom: "10px" }} src={isDark ? null : bawpikachu} />
        </CardContent>
      </Card>
    </CardsWrapper>
  );
}
