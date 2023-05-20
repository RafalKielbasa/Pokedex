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
import { useQuery } from "react-query";

const CardsWrapper = styled.div`
  margin: 20px;
`;
const FavIcon = styled(FavoriteIcon)`
  cursor: pointer;
  color: ${({ isFavorite }) => (isFavorite ? "red" : "grey")};
`;

export default function PokemonCard({
  id,
  pic,
  name,
  height,
  baseexp,
  weight,
  abilitie,
  fullPokemonData,
  favoritesData,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorite, setFavorite] = useState([]);
  // const [fullPokemonDataIds, setFullPokemonDataIds] = useState([]);
  // const [favoritesIds, setFavoritesIds] = useState([]);

  // const [newFullPokemonData, setNewFullPokemonData] = useState([]);

  // const queryFavoritesData = useQuery(["pokemoncards"], () => getFavorites());

  const navigate = useNavigate();
  const handleClick = () => {
    const path = "/details";
    navigate(path, { state: { id, fullPokemonData } });
  };

  const getFavorites = async () => {
    const response = await axios.get(`http://localhost:3000/favoriteData/`);
    console.log(response.id);
    setFavorite(response);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const favoritesIds = favorite?.data?.map((item) => item.id);

  const fullPokemonDataFiltered = fullPokemonData.filter(({ id }) =>
    [id].find((element) => element === 10, 11)
  );

  useEffect(() => {
    setIsFavorite(favoritesIds?.includes(fullPokemonData?.id));
    console.log(`isFavorite`, isFavorite);
  }, [favorite]);

  // useEffect(() => {

  //   setFavoritesIds(favoritesIds);
  // }, [favorite]);
  // if (fullPokemonData) {
  //   const fullPokemonDataIds = fullPokemonData?.map((item) => item.id);
  //   const favoritesIds = favorite?.data?.map((item) => item.id);
  //   console.log(`fullPokemonDataIds`, fullPokemonDataIds.includes(2, 5));
  // }

  // const favoriteFromJson = fullPokemonDataIds?.filter(({ id }) =>
  //   id?.includes(`5`)
  // );

  // }
  // const favoriteFromJson = fullPokemonData?.filter(
  //   (item) => item.id === favoritesIds
  // );

  // useEffect(
  //   () =>
  //     setFavorite(
  //       fullPokemonData?.filter(({ fullPokemonDataIds }) =>
  //         fullPokemonDataIds?.includes(favoritesIds)
  //       )
  //     ),
  //   []
  // );

  // console.log(`{ fullPokemonDataIds }`, { fullPokemonDataIds });

  // const { name, id } = fullPokemonData;
  // const pokemonId = fullPokemonData.map((item) => item.id);

  // const dataToFavorite = fullPokemonData.map((item) => ({
  //   id: item.id,
  //   pic: item.sprites.front_default,
  //   name: item.name,
  //   height: item.height,
  // }));
  // console.log(`dataToFavorite;`, dataToFavorite);

  const handleFavorite = () => {
    // console.log(`id`, id);
    // axios.delete(`http://localhost:3001/favoriteData/${favoritesIds}`);
    // setIsFavorite((isFavorite) => !isFavorite);

    postData("favoriteData", id, pic, name, height, baseexp, weight, abilitie);
    setIsFavorite((isFavorite) => !isFavorite);
    // } else {
    // console.log(`id`, id);
    // axios.delete(`http://localhost:3001/favoriteData/1`);
    // setIsFavorite((isFavorite) => !isFavorite);

    // const sendCollection = async () => postData(`queryFullData`, queryData);
    // setFavoriteId((resultUrl) => {
    //   resultUrl = [...resultUrl, Number(id)];
    //   return resultUrl;
    // });
  };

  // const favoriteData = fullPokemonData.filter((item) => item.marked);
  // console.log(`favoriteData`, favoriteData);

  // console.log(`expFullPokemonData`, expFullPokemonData);

  // console.log(`id`, id);
  // console.log(`isMarked`, isMarked);
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
          <FavIcon onClick={() => handleFavorite()} isFavorite={isFavorite} />
        </CardActions>
      </Card>
    </CardsWrapper>
  );
}
