import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import PokemonTile from "../components/PokemonTile";
import fetchArray from "../fetching/fetchArray";
import { useQuery } from "@tanstack/react-query";
import { GlobalContext } from "../App";

export default function Favorites() {
  const { favoritesArray } = useContext(GlobalContext);
  console.log(favoritesArray);
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
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {arrayOfFavPokemon.data.map((element) => {
        return (
          <PokemonTile
            key={`${element.name}_favorites_tile`}
            pokemon={element}
          />
        );
      })}
    </Box>
  );
}
