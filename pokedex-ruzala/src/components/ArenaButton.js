import { Castle, CastleOutlined } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../App";

export default function ArenaButton({ pokemon, sizing }) {
  const { arenaArray, setArenaArray } = useContext(GlobalContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (arenaArray.some((pokemonInArray) => pokemonInArray.id === pokemon.id)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [arenaArray]);

  const handleToggleFavorite = () => {
    if (!isActive) {
      setArenaArray([...arenaArray, pokemon]);
    } else if (isActive) {
      setArenaArray(
        arenaArray.filter((pokemonInArray) => pokemonInArray.id !== pokemon.id)
      );
    }
  };

  return (
    <Fab
      onClick={() => {
        setIsActive(!isActive);
        handleToggleFavorite();
      }}
      disabled={arenaArray.length === 2 && !isActive}
      sx={{
        position: "absolute",
        top: sizing === "small" ? "5%" : "10%",
        left: sizing === "small" ? "5%" : "10%",
        width: "36px",
        height: "36px",
      }}
    >
      {isActive ? <Castle /> : <CastleOutlined />}
    </Fab>
  );
}
