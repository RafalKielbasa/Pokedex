import { Box } from "@mui/material";
import PokemonTile from "../components/PokemonTile";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useState } from "react";
import ArrowButton from "../components/ArrowButton";
import TableProperties from "../components/TableProperties";
import { GlobalContext } from "../App";

export default function Pokemons() {
  const { pokemons, currentArray, setCurrentArray, pokemonTypes } =
    useContext(GlobalContext);

  console.log(pokemonTypes);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(15);
  if (!currentArray || !pokemonTypes) {
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
          {currentArray &&
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
