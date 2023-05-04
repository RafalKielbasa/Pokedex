import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import fetchPokeLinks from "../fetching/fetchPokeLinks";
import fetchArray from "../fetching/fetchArray";
import PokemonTile from "../components/PokemonTile";

export default function HomePage({ collection }) {
  const pokemonLinks = useQuery({
    queryKey: ["pokemonLinks"],
    queryFn: () => fetchPokeLinks(collection.pokemon),
    staleTime: 1000000,
  });
  const pokemons = useQuery({
    queryKey: ["pokemons", 1],
    queryFn: () => fetchArray(pokemonLinks.data),
    staleTime: 1000000,
    enabled: pokemonLinks.data ? true : false,
  });
  if (pokemons.isLoading) {
    return <h2>Is Loading...</h2>;
  }
  if (pokemons.isError) {
    return <Box>{JSON.stringify(pokemons.error)};</Box>;
  }
  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      id="homePage"
    >
      {pokemons.data.map((element) => {
        return <PokemonTile key={`${element.name}Tile`} pokemon={element} />;
      })}
    </Box>
  );
}
