import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import PokemonTile from "../components/PokemonTile";
import { GlobalContext } from "../App";

export default function Favorites() {
  const { favoritesArray } = useContext(GlobalContext);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {favoritesArray.length > 0 ? (
        favoritesArray.map((element) => {
          return (
            <PokemonTile
              key={`${element.name}_favorites_tile`}
              pokemon={element}
            />
          );
        })
      ) : (
        <Typography
          component="div"
          sx={{ display: "flex", alignSelf: "center" }}
        >
          Nie dodałeś żadnego pokemona do listy ulubionych.
        </Typography>
      )}
    </Box>
  );
}
