import { useQuery } from "@tanstack/react-query";
import fetchData from "../fetching/fetchData";
import { useParams, useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
import PokemonStatsTable from "../components/PokemonStatsTable";

const baseURL = process.env.REACT_APP_BASE_URL;

export default function PokemonPreview() {
  const { id } = useParams();
  const pokemonData = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => fetchData(`${baseURL}pokemon/${id}`),
    staleTime: 1000000,
  });

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
  const arrowStyle = {
    borderRadius: "0",
    background: "rgba(0, 0, 0, 0.2)",
    width: "5%",
  };
  const scaling = 0.8;
  const navigate = useNavigate();

  return (
    pokemonData.data && (
      <Box sx={{ display: "flex", width: "100%" }}>
        {pokemonData.data.id > 1 ? (
          <IconButton
            color="primary.light"
            sx={arrowStyle}
            onClick={() => {
              navigate(`/pokemon/${Number(id) - 1}`);
            }}
          >
            <ArrowBackIos />
          </IconButton>
        ) : (
          <Box sx={{ width: "5%" }} />
        )}
        <Box sx={{ display: "flex", width: "90%", flexDirection: "column" }}>
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
          <PokemonStatsTable sx={baseBoxStyle} pokemonData={pokemonData} />
        </Box>
        <IconButton
          color="primary.light"
          sx={arrowStyle}
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
