import React, { useContext } from "react";
import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { GlobalContext } from "../App";
import EditPokemonModal from "../components/EditPokemonModal";

export default function EditPokemon() {
  const { currentArray } = useContext(GlobalContext);
  console.log(currentArray);
  const scaling = 0.15;

  if (!currentArray) {
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
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "90vh",
        justifyContent: "center",
        overflow: "scroll",
      }}
    >
      <Table sx={{ width: "80%" }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type(s)</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Base Exp</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentArray.map((pokemon) => (
            <TableRow key={`${pokemon.name} row`}>
              <TableCell key={`${pokemon.name} id cell`} sx={{ width: "5%" }}>
                {pokemon.id}
              </TableCell>
              <TableCell key={`${pokemon.name} img cell`} sx={{ width: "5%" }}>
                {
                  <img
                    src={
                      pokemon.sprites.other["official-artwork"].front_default
                    }
                    height={`${226 * scaling}px`}
                    alt="pokemonSprite"
                  />
                }
              </TableCell>
              <TableCell key={`${pokemon.name} name cell`}>
                {pokemon.name.toUpperCase()}
              </TableCell>
              <TableCell key={`${pokemon.name} types cell`}>
                {pokemon.types.map((element) => {
                  return (
                    <Typography
                      key={`type ${element.type.name} ${pokemon.name}`}
                      sx={{ fontSize: "10px" }}
                    >
                      {element.type.name.toUpperCase()}
                    </Typography>
                  );
                })}
              </TableCell>
              <TableCell key={`${pokemon.name} weight cell`}>
                {pokemon.weight}
              </TableCell>
              <TableCell key={`${pokemon.name} height cell`}>
                {pokemon.height}
              </TableCell>
              <TableCell key={`${pokemon.name} exp cell`}>
                {pokemon.base_experience}
              </TableCell>
              <TableCell>
                <EditPokemonModal pokemon={pokemon} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
