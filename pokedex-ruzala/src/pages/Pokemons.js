import { Box, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import fetchPokeLinks from "../fetching/fetchPokeLinks";
import fetchArray from "../fetching/fetchArray";
import PokemonTile from "../components/PokemonTile";
import { useParams } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function HomePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const pokemonLinks = useQuery({
    queryKey: ["pokemonLinks", id],
    queryFn: () => fetchPokeLinks(id),
    staleTime: 1000000,
  });
  const pokemons = useQuery({
    queryKey: ["pokemons", id],
    queryFn: () => fetchArray(pokemonLinks.data.arrayOfLinks),
    staleTime: 1000000,
    enabled: pokemonLinks.data ? true : false,
  });
  if (pokemons.isLoading) {
    return (
      <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
        <CircularProgress
          size={100}
          color="warning"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      </Box>
    );
  }
  if (pokemons.isError) {
    return <Box>{JSON.stringify(pokemons.error)};</Box>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {id > 1 ? (
        <IconButton
          sx={{
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "0",
            width: "10%",
          }}
          onClick={() => {
            navigate(`/pokemons/${Number(id) - 1}`, { replace: true });
          }}
        >
          <ArrowBackIos />
        </IconButton>
      ) : (
        <Box />
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "80%",
        }}
      >
        {pokemons.data.map((element) => {
          return <PokemonTile key={`${element.name}Tile`} pokemon={element} />;
        })}
      </Box>
      {pokemonLinks.data.nextPage ? (
        <IconButton
          sx={{
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "0",
            width: "10%",
          }}
          onClick={() => {
            navigate(`/pokemons/${Number(id) + 1}`, { replace: true });
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      ) : (
        <Box />
      )}
    </Box>
  );
}
