import { Box } from "@mui/material";

export default function PokemonTileDummy() {
  const dataBoxStyle = {
    display: "flex",
    alignItems: "center",
    width: "40%",
    height: "25%",
    flexDirection: "column",
    margin: "0px 10px 20px 10px",
    background: "rgba(0, 0, 0, 0.2)",
    border: "3px solid lightblue",
    borderRadius: "10px",
    overflow: "hidden",
  };

  const dummyPokemonTileStyle = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "350px",
    width: "300px",
    color: "white",
    margin: 2,
    boxShadow: "5px 5px 5px black",
    border: "5px solid lightblue",
    borderRadius: "10px",
    background: "#989898",
  };

  return (
    <Box id="dummyTileContainer">
      <Box sx={dummyPokemonTileStyle} id="dummyTile">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "60%",
            height: "30%",
            alignSelf: "center",
            borderRadius: "100px",
            border: "3px solid lightblue",
            margin: 1,
            background: "#646464",
          }}
        ></Box>
        <Box
          id="dummyStatsContainer"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: "100%",
            height: "50%",
            marginTop: 2,
          }}
        >
          <Box sx={[dataBoxStyle, { width: "100%", height: "15% " }]}></Box>
          <Box sx={dataBoxStyle}></Box>
          <Box sx={dataBoxStyle}></Box>
          <Box sx={dataBoxStyle}></Box>
          <Box sx={dataBoxStyle}></Box>
        </Box>
      </Box>
    </Box>
  );
}
