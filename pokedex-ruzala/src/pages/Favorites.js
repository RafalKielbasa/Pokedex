import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import PokemonTile from "../components/PokemonTile";
import fetchArray from "../fetching/fetchArray";
import { useQuery } from "@tanstack/react-query";
import { GlobalContext } from "../App";

export default function Favorites() {
  const { favoritesArray } = useContext(GlobalContext);
  const arrayOfFavPokemon = useQuery({
    queryKey: ["favorites"],
    queryFn: () => fetchArray(favoritesArray),
    staleTime: 1000000,
  });

  useEffect(() => {
    arrayOfFavPokemon.refetch();
  }, [favoritesArray]);

  if (arrayOfFavPokemon.isLoading) {
    return <h2>Is Loading...</h2>;
  }
  if (arrayOfFavPokemon.isError) {
    return <Box>{JSON.stringify(arrayOfFavPokemon.error)};</Box>;
  }
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
        arrayOfFavPokemon.data.map((element) => {
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
