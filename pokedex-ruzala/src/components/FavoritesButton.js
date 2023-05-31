import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../App";

export default function FavoritesButton({ pokemon, sizing }) {
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
      sx={{
        position: "absolute",
        top: sizing === "small" ? "5%" : "10%",
        right: sizing === "small" ? "5%" : "10%",
        width: "36px",
        height: "36px",
      }}
    >
      {isActive ? <Favorite /> : <FavoriteBorder />}
    </Fab>
  );
}
