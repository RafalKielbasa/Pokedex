import { useParams, useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
import PokemonStatsTable from "../components/PokemonStatsTable";
import { GlobalContext } from "../App";
import { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function PokemonPreview() {
  const { id } = useParams();
  const { currentArray } = useContext(GlobalContext);

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
    <Box sx={{ display: "flex", width: "100%", height: "83vh" }}>
      {id > 1 ? (
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
      {currentArray.length > 0 && (
        <Box
          sx={{
            display: "flex",
            width: "90%",
            flexDirection: "column",
          }}
        >
          <Box sx={[baseBoxStyle, { border: "10px double lightblue" }]}>
            <img
              src={
                currentArray[id - 1].sprites.other["official-artwork"]
                  .front_default
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
            {currentArray[id - 1].name.toUpperCase()}
          </Box>
          <PokemonStatsTable
            sx={baseBoxStyle}
            pokemonData={currentArray[id - 1]}
          />
        </Box>
      )}
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
  );
}
