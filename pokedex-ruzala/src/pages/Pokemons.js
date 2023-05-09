import { Box, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import fetchPokeLinks from "../fetching/fetchPokeLinks";
import fetchArray from "../fetching/fetchArray";
import PokemonTile from "../components/PokemonTile";
import { ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import ArrowButton from "../components/ArrowButton";

export default function HomePage() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(15);

  const pokemonLinks = useQuery({
    queryKey: ["pokemonLinks"],
    queryFn: () => fetchPokeLinks(),
    staleTime: 1000000,
  });
  const pokemons = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => fetchArray(pokemonLinks.data),
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
      {currentPage > 1 ? (
        <ArrowButton
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
          variant="back"
        />
      ) : (
        <Box sx={{ width: "10%" }} />
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "80%",
        }}
      >
        {pokemons.data.map((element, index) => {
          if (
            element.id >=
              currentPage * currentItemsPerPage - currentItemsPerPage &&
            element.id <= currentPage * currentItemsPerPage
          ) {
            return (
              <PokemonTile key={`${element.name}Tile`} pokemon={element} />
            );
          }
        })}
      </Box>
      {currentPage * currentItemsPerPage < pokemons.data?.length ? (
        <ArrowButton
          onClick={() => {
            setCurrentPage(currentPage + 1);
            console.log(currentPage + 1);
          }}
          variant="forward"
        />
      ) : (
        <Box sx={{ width: "10%" }} />
      )}
    </Box>
  );
}
