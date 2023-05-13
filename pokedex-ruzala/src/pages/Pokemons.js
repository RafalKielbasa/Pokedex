import { Box, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import fetchPokeLinks from "../fetching/fetchPokeLinks";
import fetchArray from "../fetching/fetchArray";
import PokemonTile from "../components/PokemonTile";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import ArrowButton from "../components/ArrowButton";

export default function HomePage() {
  const itemsPerPageArray = [15, 30, 45, 60];

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(15);
  const [filteredArray, setFilteredArray] = useState();

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

  const handleInput = (e) => {
    pokemons.data &&
      setFilteredArray(
        pokemons.data.filter((pokemon) => pokemon.name.includes(e.target.value))
      );
  };

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
  console.log(filteredArray);
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
        <TextField
          label="Search"
          variant="filled"
          sx={{ width: "80%", justifySelf: "center" }}
          onChange={(event) => handleInput(event)}
        />
        {pokemons.isFetched && filteredArray === undefined
          ? pokemons.data.map((element, index) => {
              console.log("pokemony");
              if (
                index >=
                  currentPage * currentItemsPerPage - currentItemsPerPage &&
                index <= currentPage * currentItemsPerPage - 1
              ) {
                return (
                  <PokemonTile key={`${element.name}Tile`} pokemon={element} />
                );
              }
            })
          : filteredArray.map((element, index) => {
              console.log("filtrowane");
              if (
                index >=
                  currentPage * currentItemsPerPage - currentItemsPerPage &&
                index <= currentPage * currentItemsPerPage - 1
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
          }}
          variant="forward"
        />
      ) : (
        <Box sx={{ width: "10%" }} />
      )}
    </Box>
  );
}
