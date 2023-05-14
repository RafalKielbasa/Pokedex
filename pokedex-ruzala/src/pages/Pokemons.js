import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import fetchPokeLinks from "../fetching/fetchPokeLinks";
import fetchArray from "../fetching/fetchArray";
import PokemonTile from "../components/PokemonTile";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import ArrowButton from "../components/ArrowButton";
import TableProperties from "../components/TableProperties";
import fetchData from "../fetching/fetchData";

const baseURL = process.env.REACT_APP_BASE_URL;

export default function HomePage() {
  const pokemonLinks = useQuery({
    queryKey: ["pokemonLinks"],
    queryFn: () => fetchPokeLinks(),
    staleTime: 1000000,
  });
  const pokemons = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => fetchArray(pokemonLinks.data, setCurrentArray),
    staleTime: 1000000,
    enabled: pokemonLinks.data ? true : false,
  });
  const pokeTypes = useQuery({
    queryKey: ["pokeTypes"],
    queryFn: () => fetchData(`${baseURL}type`),
    staleTime: 1000000,
  });

  const [currentArray, setCurrentArray] = useState(
    pokemons.data ? pokemons.data : undefined
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(15);

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
        {pokemons.data && (
          <TableProperties
            pokemons={pokemons}
            itemsPerPage={currentItemsPerPage}
            itemsPerPageSetter={setCurrentItemsPerPage}
            currentPage={currentPage}
            currentPageSetter={setCurrentPage}
            currentArray={currentArray}
            currentArraySetter={setCurrentArray}
            pokemonTypes={pokeTypes.data.results}
          />
        )}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
            minHeight: "700px",
          }}
        >
          {pokemons.data &&
            currentArray.map((element, index) => {
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
      </Box>
      {currentPage * currentItemsPerPage < currentArray.length ? (
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
