import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { createPortal } from "react-dom";

const CardsWrapper = styled.div`
  margin: 20px;
`;
const FavIcon = styled(FavoriteIcon)`
  cursor: pointer;
  color: ${({ isMarked }) => (isMarked ? "red" : "grey")};
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function PokemonCard({
  id,
  pic,
  name,
  height,
  baseexp,
  weight,
  abilitie,
  fullPokemonData,
}) {
  const [isMarked, setIsMarked] = useState(false);
  const [favoriteId, setFavoriteId] = useState([]);

  const navigate = useNavigate();
  const handleClick = () => {
    const path = "/details";
    navigate(path, { state: { id, fullPokemonData } });
  };

  const handleFavorite = (e) => {
    setIsMarked((isMarked) => !isMarked);
    setFavoriteId((resultUrl) => {
      resultUrl = [...resultUrl, Number(id)];
      return resultUrl;
    });
  };

  console.log(`favoriteId`, favoriteId);
  // console.log(`isMarked`, isMarked);
  return (
    <CardsWrapper>
      <Card
        sx={{
          width: 320,
          "&:hover": {
            transform: "scale(1.15)",
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
          <FavIcon
            onClick={(e) => handleFavorite(e.target.id)}
            isMarked={isMarked}
          />
        </CardActions>
      </Card>
    </CardsWrapper>
  );
}
