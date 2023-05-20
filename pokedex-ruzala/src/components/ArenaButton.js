import { Castle, CastleOutlined } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../App";

const baseURL = process.env.REACT_APP_BASE_URL;

export default function ArenaButton({ pokemon }) {
  const { arenaArray, setArenaArray } = useContext(GlobalContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (arenaArray.includes(`${baseURL}pokemon/${pokemon.id}`)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [arenaArray]);

  return (
    <Fab
      onClick={async () => {
        setIsActive(!isActive);
        handleToggleFavorite(isActive, arenaArray, setArenaArray, pokemon);
      }}
      disabled={arenaArray.length === 2 && !isActive}
      size="small"
      sx={{ position: "absolute", top: "30px", left: "220px" }}
    >
      {isActive ? <Castle /> : <CastleOutlined />}
    </Fab>
  );
}

const handleToggleFavorite = (isActive, arenaArray, setArenaArray, pokemon) => {
  if (!isActive) {
    setArenaArray([...arenaArray, `${baseURL}pokemon/${pokemon.id}`]);
  } else if (isActive) {
    setArenaArray(
      arenaArray.filter((url) => url !== `${baseURL}pokemon/${pokemon.id}`)
    );
  }
};
