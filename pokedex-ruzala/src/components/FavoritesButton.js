import { FavoriteBorder, Favorite, FavoriteSharp } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../App";

const baseURL = process.env.REACT_APP_BASE_URL;

export default function FavoritesButton({ pokemon }) {
  const { favoritesArray, setFavoritesArray } = useContext(GlobalContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (favoritesArray.includes(`${baseURL}pokemon/${pokemon.id}`)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [favoritesArray]);

  return (
    <Fab
      onClick={async () => {
        setIsActive(!isActive);
        handleToggleFavorite(
          isActive,
          setIsActive,
          favoritesArray,
          setFavoritesArray,
          pokemon
        );
      }}
      size="small"
      sx={{ position: "absolute", top: "30px", left: "30px" }}
    >
      {isActive ? <Favorite /> : <FavoriteBorder />}
    </Fab>
  );
}

const handleToggleFavorite = (
  isActive,
  setIsActive,
  favoritesArray,
  setFavoritesArray,
  pokemon
) => {
  if (!isActive) {
    setFavoritesArray([...favoritesArray, `${baseURL}pokemon/${pokemon.id}`]);
  } else if (isActive) {
    setFavoritesArray(
      favoritesArray.filter((url) => url !== `${baseURL}pokemon/${pokemon.id}`)
    );
  }
};
