import * as React from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "styled-components";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { GiCrossedSwords } from "react-icons/gi";
import { postData } from "src/api/postData";
import { bawpikachu } from "src/Images";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "src/context/AppContext";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";

const CardWrapper = styled(Card)`
  margin: 20px;
  width: 320px;
  :hover {
    transform: scale(1.1);
  }
`;
const CardMediaWrapper = styled.div`
  text-align: center;
  margin-top: 10px;
`;
const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const ArenaCardContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
  margin-top: 30px;
  margin-bottom: 70px;
`;
const CardValuesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TypographyWrapper = styled(Typography)`
  text-align: center;
`;
const CardActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const BlankPokemonCardWrapper = styled(Card)`
  width: 320px;
  height: 340px;
`;
const FavIcon = styled(FavoriteIcon)`
  cursor: pointer;
`;
const BattleIcon = styled(GiCrossedSwords)`
  cursor: pointer;
  margin-right: 20px;
  font-size: 20px;
`;
const IndexWrapper = styled.div`
  position: absolute;
  left: 78%;
  top: 15px;
  font-size: 40px;
`;
const WinsWrapper = styled.div`
  position: absolute;
  left: 10%;
  top: 20px;
`;

export default function PokemonCard({
  id,
  index,
  selectValue,
  pic,
  picDet,
  name,
  height,
  baseexp,
  weight,
  abilitie,
  wins,
  expFullPokemonDataFormated,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBattle, setIsBattle] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    isDark,
    theme,
    toggleBattleChange,
    battleIds,
    toggleFavoritesChange,
    favorites,
    favoritesIds,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const handleClick = () => {
    const path = "/details";
    navigate(path, {
      state: {
        id,
        expFullPokemonDataFormated,
        favorites,
        favoritesIds,
        selectValue,
      },
    });
  };

  useEffect(() => {
    setIsFavorite(favoritesIds.includes(id));
  }),
    [favoritesIds];

  useEffect(() => {
    setIsBattle(battleIds?.includes(id));
  }),
    [battleIds];

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
      toggleFavoritesChange();
      enqueueSnackbar(`Pokemon ${name} został dodany do "Ulubionych"`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    } else {
      axios.delete(`http://localhost:3001/favoriteData/${id}`);
      toggleFavoritesChange();
      enqueueSnackbar(`Pokemon ${name} został usunięty z "Ulubionych"`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    }
  };

  const handleBattle = () => {
    if (!battleIds.includes(id) && battleIds.length > 1 && !isBattle) {
      enqueueSnackbar(`Na Arenie mogą znajdować się tylko 2 pokemony`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    } else if (!isBattle) {
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
      toggleBattleChange();
      enqueueSnackbar(`Pokemon ${name} poszedł walczyć na Arenę`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    } else {
      axios.delete(`http://localhost:3001/battle/${id}`);
      toggleBattleChange();
      enqueueSnackbar(`Pokemon ${name} został usunięty z Areny`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    }
  };

  return (
    <CardWrapper
      style={{
        backgroundColor: isDark ? "#bcaaa4" : "white",
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardMediaWrapper>
          <img src={pic} alt={"picture"} key={id} />
        </CardMediaWrapper>
        <IndexWrapper>{index}</IndexWrapper>
        {selectValue === "wins" ? (
          <WinsWrapper>
            <TypographyWrapper
              style={{
                fontWeight: "bold",
              }}
              variant="body2"
              color="text.secondary"
            >
              Wins
            </TypographyWrapper>
            <TypographyWrapper
              style={{
                fontWeight: "bold",
                fontSize: "24px",
              }}
              variant="body2"
              color="text.secondary"
            >
              {wins}
            </TypographyWrapper>
          </WinsWrapper>
        ) : (
          []
        )}
        <TypographyWrapper gutterBottom variant="h5" component="div">
          {name}
        </TypographyWrapper>

        <CardContentWrapper>
          <CardValuesWrapper>
            <TypographyWrapper variant="body2" color="text.secondary">
              {height}
            </TypographyWrapper>
            <TypographyWrapper
              style={{
                fontWeight: "bold",
                paddingBottom: "20px",
              }}
              variant="body2"
              color="text.secondary"
            >
              Height
            </TypographyWrapper>
            <TypographyWrapper variant="body2" color="text.secondary">
              {baseexp}
            </TypographyWrapper>
            <TypographyWrapper
              style={{ fontWeight: "bold" }}
              variant="body2"
              color="text.secondary"
            >
              Base experience
            </TypographyWrapper>
          </CardValuesWrapper>

          <CardValuesWrapper>
            <TypographyWrapper variant="body2" color="text.secondary">
              {weight}
            </TypographyWrapper>
            <TypographyWrapper
              style={{ fontWeight: "bold", paddingBottom: "20px" }}
              variant="body2"
              color="text.secondary"
            >
              Weight
            </TypographyWrapper>
            <TypographyWrapper variant="body2" color="text.secondary">
              {abilitie}
            </TypographyWrapper>
            <TypographyWrapper
              style={{ fontWeight: "bold" }}
              variant="body2"
              color="text.secondary"
            >
              Abilitie
            </TypographyWrapper>
          </CardValuesWrapper>
        </CardContentWrapper>
      </CardActionArea>
      <CardActionsWrapper>
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
      </CardActionsWrapper>
    </CardWrapper>
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
  const { isDark } = useContext(AppContext);

  return (
    <CardWrapper>
      <Card
        style={{
          backgroundColor: isDark ? "#bcaaa4" : "white",
          width: 320,
        }}
      >
        <CardMediaWrapper>
          <img src={pic} alt={"picture"} key={id} />
        </CardMediaWrapper>

        <TypographyWrapper gutterBottom variant="h5" component="div">
          {name}
        </TypographyWrapper>

        <ArenaCardContentWrapper>
          <CardValuesWrapper>
            <TypographyWrapper variant="body2" color="text.secondary">
              {height}
            </TypographyWrapper>
            <TypographyWrapper
              style={{
                fontWeight: "bold",
                paddingBottom: "20px",
              }}
              variant="body2"
              color="text.secondary"
            >
              Height
            </TypographyWrapper>
            <TypographyWrapper variant="body2" color="text.secondary">
              {baseexp}
            </TypographyWrapper>
            <TypographyWrapper
              style={{ fontWeight: "bold" }}
              variant="body2"
              color="text.secondary"
            >
              Base experience
            </TypographyWrapper>
          </CardValuesWrapper>

          <CardValuesWrapper>
            <TypographyWrapper variant="body2" color="text.secondary">
              {weight}
            </TypographyWrapper>
            <TypographyWrapper
              style={{ fontWeight: "bold", paddingBottom: "20px" }}
              variant="body2"
              color="text.secondary"
            >
              Weight
            </TypographyWrapper>
            <TypographyWrapper variant="body2" color="text.secondary">
              {abilitie}
            </TypographyWrapper>
            <TypographyWrapper
              style={{ fontWeight: "bold" }}
              variant="body2"
              color="text.secondary"
            >
              Abilitie
            </TypographyWrapper>
          </CardValuesWrapper>
        </ArenaCardContentWrapper>
      </Card>
    </CardWrapper>
  );
}

export function BlankPokemonCard() {
  const { isDark } = useContext(AppContext);

  return (
    <CardWrapper>
      <BlankPokemonCardWrapper
        style={{
          backgroundColor: isDark ? "#bcaaa4" : "white",
        }}
      >
        <CardContent
          style={{
            backgroundColor: isDark ? "#bcaaa4" : "white",
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
      </BlankPokemonCardWrapper>
    </CardWrapper>
  );
}
