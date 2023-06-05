import { Box } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import PokemonTileSmall from "../components/PokemonTileSmall";
import { useContext, useState } from "react";
import ArrowButton from "../components/ArrowButton";
import TableProperties from "../components/TableProperties";
import { GlobalContext } from "../App";

export default function Pokemons() {
  const { pokemons, currentArray, setCurrentArray, pokemonTypes } =
    useContext(GlobalContext);

  console.log(pokemonTypes);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(6);
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
        width: "100%",
        height: "83vh",
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
        id="pokemonsMiddleSection"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "80%",
          overflow: currentItemsPerPage > 6 ? "scroll" : "hidden",
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
            alignContent: "start",
            justifyContent: "space-between",
            width: "100%",
            height: "70vh",
            paddingBottom: "3%",
            minHeight: "700px",
          }}
          id="pokemonDisplay"
        >
          {currentArray &&
            currentArray.map((element, index) => {
              if (
                index >=
                  currentPage * currentItemsPerPage - currentItemsPerPage &&
                index <= currentPage * currentItemsPerPage - 1
              ) {
                return (
                  <PokemonTileSmall
                    key={`${element.name}Tile`}
                    pokemon={element}
                  />
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
