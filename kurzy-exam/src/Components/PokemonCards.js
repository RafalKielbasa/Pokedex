import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardActionArea } from "@mui/material";
import { postData } from "src/api/postData";

const CardsWrapper = styled.div`
  margin: 20px;
`;
const FavIcon = styled(FavoriteIcon)`
  cursor: pointer;
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
  fullPokemonData,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritesIds, setFavoritesIds] = useState([]);

  const navigate = useNavigate();
  const handleClick = () => {
    const path = "/details";
    navigate(path, { state: { id, fullPokemonData, favorites } });
  };

  const getFavorites = async () => {
    const response = await axios.get(`http://localhost:3000/favoriteData/`);
    setFavorites(response.data);
    const getFavoritesIds = response?.data?.map((item) => item.id);
    setFavoritesIds(getFavoritesIds);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    const getFavoritesIds = favorites?.map((item) => item.id);
    setFavoritesIds(getFavoritesIds);
  }, [favorites.length]);

  // useEffect(() => {
  //   const array = fullPokemonData.filter((elem) => {
  //     return favoritesIds.some((ele) => {
  //       return elem.id === ele;
  //     });
  //   });
  //   setFavoritesArray(array);
  // }, [favorites]);

  // const fullPokemonDataIds = fullPokemonData?.map((item) => item.id);
  // console.log(`favoritesIds`, favoritesIds);
  // console.log(`favorites`, favorites);

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
      // setIsFavorite((isFavorite) => !isFavorite);
      getFavorites();
      window.location.reload(false);
    } else {
      axios.delete(`http://localhost:3000/favoriteData/${id}`);
      // setIsFavorite((isFavorite) => !isFavorite);
      getFavorites();
      window.location.reload(false);
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
          <FavIcon
            onClick={() => handleFavorite()}
            // isFavorite={isFavorite}
            sx={{
              color: favoritesIds.includes(id) ? "red" : "grey",
            }}
          />
        </CardActions>
      </Card>
    </CardsWrapper>
  );
}
