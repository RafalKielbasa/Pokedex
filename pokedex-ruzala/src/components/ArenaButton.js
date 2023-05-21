import { Castle, CastleOutlined } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../App";

export default function ArenaButton({ pokemon }) {
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
      size="small"
      sx={{ position: "absolute", top: "30px", left: "270px" }}
    >
      {isActive ? <Castle /> : <CastleOutlined />}
    </Fab>
  );
}
