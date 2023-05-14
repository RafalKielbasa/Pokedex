import * as React from "react";
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

const CardsWrapper = styled.div`
  margin: 20px;
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
  const navigate = useNavigate();
  const handleClick = () => {
    const path = "/details";
    navigate(path, { state: { id, fullPokemonData } });
  };

  return (
    <CardsWrapper>
      <Card
        sx={{
          width: 320,
          "&:hover": {
            transform: "scale(1.15)",
          },
        }}
        onClick={(e) => handleClick(e.currentTarget.id)}
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
        >
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "#d50000" }} />}
          />
        </CardActions>
      </Card>
    </CardsWrapper>
  );
}
