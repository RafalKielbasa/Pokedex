import * as React from "react";
import { useNavigate } from "react-router-dom";
import { CardImg, CardBoxInfo, HoverCard } from "../CardElements";
import { Card, Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ColorizeIcon from "@mui/icons-material/Colorize";
import styled from "styled-components";
const DetailedConatiner = styled.div` 
display: flex;
width: 700px;
margin-bottom 10px;
margin-top 30px;
`;
const InfoHeader = styled.div`
  color: #4bc5a0;
  font-weight: 600;
  text-shadow: 1px 1px #4bc5a0;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 10px;
`;
const PokedexTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 10px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const InfoContainer = styled.div`
  display: flex;
  gap: 5%;
  align-items: center;
  margin-left: 50px;
  margin-right: 50px;
`;
const FavoriteWrapper = styled.div`
  margin-bottom: 20px;
`;
const DetailedPokemonCard = ({
  value,
  onClickFavorite,
  isFavorite,
  inArena,
  onClickArena,
  firstFighterProp,
  secondFighterProp,
}) => {
  const navigate = useNavigate();
  const dataToPass = value?.data;
  return (
    <DetailedConatiner>
      <HoverCard>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 700,
            justifyContent: "center",
            background: "white",
          }}
        >
          <InfoHeader>Strona szczegółów pokemona</InfoHeader>
          <PokedexTitle>POKEDEX</PokedexTitle>
          <InfoContainer>
            <CardImg dataToPass={dataToPass}></CardImg>
            <CardBoxInfo dataToPass={dataToPass}></CardBoxInfo>
          </InfoContainer>
          <FavoriteWrapper>
            <span>
              {isFavorite ? "USUŃ Z ULUBIONYCH" : "DODAJ DO ULUBIONYCH"}
            </span>
            <IconButton
              aria-label="favorite"
              onClick={onClickFavorite}
              sx={{ color: isFavorite ? "red" : "grey" }}
            >
              <FavoriteIcon />
            </IconButton>
          </FavoriteWrapper>
          <FavoriteWrapper>
            {firstFighterProp && secondFighterProp ? (
              <div>MAKSYMALNA LICZBA POKEMONÓW NA ARENIE</div>
            ) : inArena ? (
              <div>POKEMON ZOSTAŁ WYSŁANY NA ARENĘ</div>
            ) : (
              <div>
                <span>DODAJ DO ARENY</span>
                <IconButton
                  aria-label="fight"
                  onClick={onClickArena}
                  sx={{ color: inArena ? "red" : "grey" }}
                >
                  <ColorizeIcon />
                </IconButton>
              </div>
            )}
          </FavoriteWrapper>
          <Button
            variant="outlined"
            color="error"
            sx={{ width: 700, borderColor: " #ff66a3", color: " #ff66a3" }}
            onClick={() => navigate(`/`)}
          >
            Strona Główna
          </Button>
        </Card>
      </HoverCard>
    </DetailedConatiner>
  );
};

export default DetailedPokemonCard;
