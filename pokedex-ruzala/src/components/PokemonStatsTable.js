import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";

export default function PokemonStatsTable({ sx, pokemonData }) {
  return (
    <Box sx={[sx, { width: "60%" }]}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Type(s)</TableCell>
            <TableCell>
              {pokemonData.types.map((element) => (
                <Box>{element.type.name}</Box>
              ))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{`#${pokemonData.id}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Weight</TableCell>
            <TableCell>{pokemonData.weight}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Height</TableCell>
            <TableCell>{pokemonData.height}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box
        sx={{
          height: "100%",
          width: "2%",
          background: "lightblue",
          borderRadius: "20px",
          alignSelf: "center",
        }}
      ></Box>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Attack</TableCell>
            <TableCell>{pokemonData.stats[1].base_stat}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Defence</TableCell>
            <TableCell>{pokemonData.stats[2].base_stat}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>HP</TableCell>
            <TableCell>{pokemonData.stats[0].base_stat}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Base Experience</TableCell>
            <TableCell>{pokemonData.base_experience}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}
