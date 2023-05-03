import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import fetchData from "../fetching/fetchData";
import fetchArray from "../fetching/fetchArray";
import PokemonTile from "../components/PokemonTile";

export default function HomePage({ collection }) {
  const pokemonLinks = useQuery({
    queryKey: ["pokemonLinks"],
    queryFn: () => fetchData(collection.pokemon),
    staleTime: 1000000,
  });
  const pokemons = useQuery({
    queryKey: ["pokemons", 1],
    queryFn: () => fetchArray(pokemonLinks.data.results),
    staleTime: 1000000,
    enabled: pokemonLinks.data ? true : false,
  });
  console.log(pokemons.data);
  if (pokemons.isLoading) {
    return <h2>Is Loading...</h2>;
  }
  if (pokemons.isError) {
    return <Box>{JSON.stringify(pokemons.error)};</Box>;
  }
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {pokemons.data.map((element) => {
        return <PokemonTile pokemon={element} />;
      })}
    </Box>
  );
}
