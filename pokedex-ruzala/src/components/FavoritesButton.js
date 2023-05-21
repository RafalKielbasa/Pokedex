import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../App";

export default function FavoritesButton({ pokemon }) {
  const { favoritesArray, setFavoritesArray } = useContext(GlobalContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      favoritesArray.some((pokemonInArray) => pokemonInArray.id === pokemon.id)
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [favoritesArray]);

  const handleToggleFavorite = () => {
    if (!isActive) {
      setFavoritesArray([...favoritesArray, pokemon]);
    } else if (isActive) {
      setFavoritesArray(
        favoritesArray.filter(
          (pokemonInArray) => pokemonInArray.id !== pokemon.id
        )
      );
    }
  };

  return (
    <Fab
      onClick={() => {
        setIsActive((prev) => !prev);
        handleToggleFavorite();
      }}
      size="small"
      sx={{ position: "absolute", top: "30px", left: "30px" }}
    >
      {isActive ? <Favorite /> : <FavoriteBorder />}
    </Fab>
  );
}
