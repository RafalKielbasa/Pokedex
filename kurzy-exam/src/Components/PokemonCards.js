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
const FavIcon = styled(FavoriteIcon)(
  ({ isFavorite }) => `
    cursor: pointer;
    color: ${isFavorite ? "red" : "grey"};
  `
);

export default function PokemonCard({
  id,
  pic,
  name,
  height,
  baseexp,
  weight,
  abilitie,
  fullPokemonData,
  partialPokemonData,
  fullPokemonDataFiltered,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritesArray, setFavoritesArray] = useState([]);
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
    setFavorites(response.data);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const favoritesIds = favorites?.map((item) => item.id);

  useEffect(() => {
    const array = fullPokemonData.filter((elem) => {
      return favoritesIds.some((ele) => {
        return elem.id === ele;
      });
    });
    setIsFavorite(array.id);

    // array.forEach((item) => {
    //   item ? setIsFavorite(false) : setIsFavorite(true);
    // });
    console.log(`array`, array);
  }, [favorites]);

  // const fullPokemonDataIds = fullPokemonData?.map((item) => item.id);

  // console.log(`favorites`, favorites);
  // console.log(`fullPokemonData`, fullPokemonData);

  // const fullPokemonDataFiltered = fullPokemonData.filter(({ id }) =>
  //   [id].find((element) => element === 10, 11)
  // );

  // useEffect(() => {
  //   // setIsFavorite(favoritesIds?.includes(fullPokemonData?.id));
  //   // !favoritesIds?.includes(fullPokemonDataIds) && setIsFavorite(true);
  //   // console.log(`isFavorite`, isFavorite);
  //   // fullPokemonData[0].isFavorite = "true";
  // }, [favorites]);

  // const test2 = [test].filter((item) => item);

  // console.log(`fullPokemonDataIds`, fullPokemonDataIds);

  // const test = fullPokemonData.filter(function (item) {
  //   // console.log(`item`, item.id);
  //   return [item.id].includes(favoritesIds);
  // });

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
  //
  const handleFavorite = () => {
    if (!isFavorite && !favorites.includes(fullPokemonData?.id)) {
      postData(
        "favoriteData",
        id,
        pic,
        name,
        height,
        baseexp,
        weight,
        abilitie
      );
      setIsFavorite((isFavorite) => !isFavorite);
      getFavorites();
    } else {
      axios.delete(`http://localhost:3000/favoriteData/${id}`);
      setIsFavorite((isFavorite) => !isFavorite);
    }

    // } else {
    // console.log(`fullPokemonData[id - 1]`, fullPokemonData[id - 1]);
    // console.log(`id`, id);

    //
    // setIsFavorite((isFavorite) => !isFavorite);

    // const sendCollection = async () => postData(`queryFullData`, queryData);
    // setFavoriteId((resultUrl) => {
    //   resultUrl = [...resultUrl, Number(id)];
    //   return resultUrl;
    // });
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
          <FavIcon onClick={(e) => handleFavorite()} isFavorite={isFavorite} />
        </CardActions>
      </Card>
    </CardsWrapper>
  );
}
