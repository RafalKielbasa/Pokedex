import * as React from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { GiCrossedSwords } from "react-icons/gi";
import { CardActionArea } from "@mui/material";
import { postData } from "src/api/postData";
import { bawpikachu } from "src/Images";

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
  expFullPokemonDataFormated,
  favorites,
  favoritesIds,
  battle,
  battleIds,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleClick = () => {
    const path = "/details";
    navigate(path, {
      state: { id, expFullPokemonDataFormated, favorites, favoritesIds },
    });
  };

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
        abilitie
      );
      enqueueSnackbar(`Pokemon ${name} został dodany do "Ulubionych"`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    } else {
      axios.delete(`http://localhost:3000/favoriteData/${id}`);
      enqueueSnackbar(`Pokemon ${name} został usunięty z "Ulubionych"`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    }
  };

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
        abilitie
      );
      enqueueSnackbar(`Pokemon ${name} poszedł walczyć na Arenę`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    } else {
      axios.delete(`http://localhost:3000/battle/${id}`);
      enqueueSnackbar(`Pokemon ${name} został usunięty z Areny`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
      setTimeout(function () {
        window.location.reload();
      }, 1200);
    }
  };

  return (
    <CardsWrapper>
      <Card
        sx={{
          width: 320,
          "&:hover": {
            transform: "scale(1.10)",
          },
        }}
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
            onClick={() => handleBattle()}
            style={{ color: battleIds.includes(id) ? "red" : "grey" }}
          />
          <FavIcon
            onClick={() => handleFavorite()}
            sx={{
              color: favoritesIds.includes(id) ? "red" : "grey",
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
}) {
  return (
    <CardsWrapper>
      <Card
        sx={{
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
  return (
    <CardsWrapper>
      <Card
        sx={{
          width: 320,
          height: 330,
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
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
              textAlign: "center",
            }}
            variant="body2"
            color="text.secondary"
          >
            Miejsce na walczącego pokemona
          </Typography>
          <img sx={{ marginBottom: "10px" }} src={bawpikachu} alt={"picture"} />
        </CardContent>
      </Card>
    </CardsWrapper>
  );
}
