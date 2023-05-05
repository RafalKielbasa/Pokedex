import { useQuery } from "@tanstack/react-query";
import fetchData from "../fetching/fetchData";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";

const baseURL = process.env.REACT_APP_BASE_URL;

export default function PokemonPreview() {
  const { id } = useParams();
  const pokemonData = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => fetchData(`${baseURL}pokemon/${id}`),
    staleTime: 1000000,
  });
  const scaling = 0.8;
  const navigate = useNavigate();
  const baseBoxStyle = {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: "20px",
    border: "4px solid lightblue",
    margin: 1,
    background: "rgba(0, 0, 0, 0.3)",
    padding: "10px",
  };
  console.log(pokemonData.data && pokemonData.data.forms[0]);
  return (
    pokemonData.data && (
      <Box sx={{ display: "flex", width: "100%" }}>
        {pokemonData.data.id > 1 && (
          <IconButton
            color="primary.light"
            onClick={() => {
              navigate(`/pokemon/${Number(id) - 1}`);
            }}
          >
            <ArrowBackIos />
          </IconButton>
        )}
        <Box sx={{ display: "flex", flexGrow: "2", flexDirection: "column" }}>
          <Box sx={[baseBoxStyle, { border: "10px double lightblue" }]}>
            <img
              src={
                pokemonData.data.sprites.other["official-artwork"].front_default
              }
              height={`${226 * scaling}px`}
              alt="pokemonSprite"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              width: "100%",
              marginTop: 2,
            }}
          ></Box>
          <Box sx={[baseBoxStyle, { fontSize: "20px" }]}>
            {pokemonData.data.name.toUpperCase()}
          </Box>
          <Box sx={[baseBoxStyle, { width: "60%" }]}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Type(s)</TableCell>
                  <TableCell>
                    {pokemonData.data.types.map((element) => (
                      <Box>{element.type.name}</Box>
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>{`#${pokemonData.data.id}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Weight</TableCell>
                  <TableCell>{pokemonData.data.weight}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Height</TableCell>
                  <TableCell>{pokemonData.data.height}</TableCell>
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
                  <TableCell>{pokemonData.data.stats[1].base_stat}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Defence</TableCell>
                  <TableCell>{pokemonData.data.stats[2].base_stat}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HP</TableCell>
                  <TableCell>{pokemonData.data.stats[0].base_stat}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>EXP</TableCell>
                  <TableCell>{pokemonData.data.base_experience}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>
        <IconButton
          color="primary.light"
          onClick={() => {
            navigate(`/pokemon/${Number(id) + 1}`, { replace: true });
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    )
  );
}
