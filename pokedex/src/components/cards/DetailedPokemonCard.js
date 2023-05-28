import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ColorizeIcon from "@mui/icons-material/Colorize";

import styled from "styled-components";

import GlobalContext from "src/context/GlobalContext";

import { CardImg, CardBoxInfo, HoverCard } from "../cardElements";

const DetailedConatiner = styled.div` 
display: flex;
justify-content: center;
align-items:center;
margin-bottom 10px;
margin-top 30px;
}`;

const MyCard = styled.div`
  display: "flex";
  width: 700px;
  flex-direction: "column";
  justify-content: "center";
  background: ${(prop) => prop.theme.bgCardColor};
  color: ${(prop) => prop.theme.textColor};
  padding: 10px;
  @media (max-width: 700px) {
    width: 400px;
  }
  @media (max-width: 400px) {
    width: 220px;
  }
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
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const FavoriteWrapper = styled.div`
  margin-bottom: 20px;
`;

const DetailedPokemonCard = ({
  value,
  onClickFavorite,
  isFavorite,
  myName,
  onClickArena,
  firstFighterProp,
  secondFighterProp,
}) => {
  const navigate = useNavigate();
  const dataToPass = value;
  const { theme, ActiveBtnHandle } = useContext(GlobalContext);

  return (
    <DetailedConatiner>
      <HoverCard>
        <MyCard theme={theme}>
          <InfoHeader>Strona szczegółów pokemona</InfoHeader>
          <PokedexTitle>POKEDEX</PokedexTitle>
          <InfoContainer>
            <CardImg dataToPass={dataToPass}></CardImg>
            <CardBoxInfo dataToPass={dataToPass}></CardBoxInfo>
          </InfoContainer>
          <FavoriteWrapper>
            <span>{isFavorite ? "USUŃ Z ULUBIONYCH" : "DODAJ DO ULUBIONYCH"}</span>
            <IconButton
              aria-label="favorite"
              onClick={onClickFavorite}
              sx={{
                color: isFavorite ? theme.heartActive : theme.heartDisabled,
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </FavoriteWrapper>
          <FavoriteWrapper>
            {firstFighterProp === myName || secondFighterProp === myName ? (
              <div>POKEMON ZOSTAŁ WYSŁANY NA ARENĘ</div>
            ) : firstFighterProp && secondFighterProp ? (
              <div>MAKSYMALNA LICZBA POKEMONÓW NA ARENIE, NIE MOŻESZ DODAĆ KOLEJNEGO</div>
            ) : (
              <div>
                <span>DODAJ DO ARENY</span>
                <IconButton aria-label="fight" onClick={onClickArena}>
                  <ColorizeIcon />
                </IconButton>
              </div>
            )}
          </FavoriteWrapper>
          <Button
            variant="outlined"
            color="error"
            sx={{
              width: "100%",
              borderColor: theme.borderColor,
              color: theme.borderColor,
            }}
            onClick={() => {
              navigate(`/`);
              ActiveBtnHandle("Home");
            }}
          >
            Strona Główna
          </Button>
        </MyCard>
      </HoverCard>
    </DetailedConatiner>
  );
};

export default DetailedPokemonCard;
