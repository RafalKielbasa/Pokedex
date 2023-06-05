import { Box, Button, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import PokemonTile from "../components/PokemonTile";
import PokemonTileDummy from "../components/PokemonTileDummy";
import { GlobalContext } from "../App";
import BattleButton from "../components/BattleButton";

export default function Arena() {
  const { arenaArray, setArenaArray } = useContext(GlobalContext);

  const [winner, setWinner] = useState();
  const [loser, setLoser] = useState();

  const isLoser = (pokemon) => {
    if (loser) {
      if (pokemon.id === loser.id) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    setWinner(null);
    setLoser(null);
  }, [arenaArray]);
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
      id="mainArenaContainer"
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        <Button
          disabled={arenaArray.length === 0}
          variant="contained"
          onClick={() => {
            setArenaArray([]);
            setWinner(null);
            setLoser(null);
          }}
        >
          Wyczyść arenę.
        </Button>
        {winner && (
          <Typography
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, -0%)",
              zIndex: "20",
            }}
          >
            {typeof winner === "object" &&
              `${winner.name.toUpperCase()} ZWYCIĘŻYŁ!`}
            {winner === 0 && `REMIS`}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10%",
          flexGrow: "1",
        }}
        id="fightContainer"
      >
        {arenaArray.length !== 0 ? (
          <PokemonTile
            key={`${arenaArray[0].name}_arena_tile`}
            pokemon={arenaArray[0]}
            opacityDown={isLoser(arenaArray[0]) ? true : false}
            disableZoom={true}
          />
        ) : (
          <PokemonTileDummy />
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BattleButton
            setWinner={setWinner}
            setLoser={setLoser}
            disabled={arenaArray.length !== 2 ? true : false}
          />
        </Box>
        {arenaArray.length === 2 ? (
          <PokemonTile
            key={`${arenaArray[1].name}_arena_tile`}
            pokemon={arenaArray[1]}
            opacityDown={isLoser(arenaArray[1]) ? true : false}
            disableZoom={true}
          />
        ) : (
          <PokemonTileDummy />
        )}
      </Box>
    </Box>
  );
}
