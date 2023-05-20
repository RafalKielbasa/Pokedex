import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import PokemonTile from "../components/PokemonTile";
import fetchArray from "../fetching/fetchArray";
import { useQuery } from "@tanstack/react-query";
import { GlobalContext } from "../App";

export default function Arena() {
  const { arenaArray } = useContext(GlobalContext);
  const arrayOfArenaPokemon = useQuery({
    queryKey: ["arena"],
    queryFn: () => fetchArray(arenaArray),
    staleTime: 1000000,
  });

  useEffect(() => {
    arrayOfArenaPokemon.refetch();
  }, [arenaArray]);

  if (arrayOfArenaPokemon.isLoading) {
    return <h2>Is Loading...</h2>;
  }
  if (arrayOfArenaPokemon.isError) {
    return <Box>{JSON.stringify(arrayOfArenaPokemon.error)};</Box>;
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
      {arenaArray.length > 0 ? (
        arrayOfArenaPokemon.data.map((element) => {
          return (
            <PokemonTile key={`${element.name}_arena_tile`} pokemon={element} />
          );
        })
      ) : (
        <Typography
          component="div"
          sx={{ display: "flex", alignSelf: "center" }}
        >
          Nie dodałeś żadnego pokemona do areny.
        </Typography>
      )}
    </Box>
  );
}
