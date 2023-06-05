import { Box, Typography } from "@mui/material";
import FavoritesButton from "./FavoritesButton";
import ArenaButton from "./ArenaButton";
import { useNavigate } from "react-router-dom";

const scaling = 0.6;

export default function PokemonTileSmall({
  pokemon,
  disableZoom = false,
  opacityDown = false,
}) {
  const navigate = useNavigate();

  const shadow =
    disableZoom === true ? "5px 5px 5px black" : "1px 1px 5px black";

  const dataBoxStyle = {
    display: "flex",
    alignItems: "center",
    width: "40%",
    height: "30%",
    flexDirection: "column",
    margin: "1%",
    background: "rgba(0, 0, 0, 0.2)",
    border: "3px solid lightblue",
    borderRadius: "10px",
    overflow: "hidden",
    fontSize: "10px",
  };

  const singleTypePokemonTile = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    color: "white",
    boxShadow: "5px 5px 5px black",
    border: "5px solid lightblue",
    borderRadius: "10px",
    background: `${backgroundColorChecker(pokemon.types[0].type.name)}`,
    "&:hover": { boxShadow: `${shadow}` },
  };

  const dualTypePokemonTile = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    color: "white",
    boxShadow: "5px 2px 10px black",
    border: "5px solid lightblue",
    borderRadius: "10px",
    background:
      pokemon.types[1] &&
      `linear-gradient(to right, ${backgroundColorChecker(
        pokemon.types[1].type.name
      )} 40%,${backgroundColorChecker(pokemon.types[0].type.name)} 55%)`,
    "&:hover": { boxShadow: `${shadow}` },
  };

  const fontSizing = { fontSize: "0.6rem" };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        width: "28%",
        height: "31%",
        margin: "2%",
        "&:hover": {
          transform: disableZoom === false ? "scale(1.07)" : "scale(1)",
        },
      }}
      id="mainTileBox"
    >
      <FavoritesButton pokemon={pokemon} sizing="small" />
      <ArenaButton pokemon={pokemon} sizing="small" />

      <Box
        sx={[
          pokemon.types[1] ? dualTypePokemonTile : singleTypePokemonTile,
          opacityDown === false ? { opacity: "1" } : { opacity: "0.5" },
        ]}
        onClick={() => {
          navigate(`/pokemon/${pokemon.id}`);
        }}
        id="tile"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "60%",
            alignSelf: "center",
            borderRadius: "100px",
            border: "3px solid lightblue",
            background: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            height={`${226 * (scaling * scaling)}px`}
            alt="pokemonSprite"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Box
            sx={[
              dataBoxStyle,
              {
                width: "90%",
                height: "15% ",
                fontSize: "0.8rem",
              },
            ]}
          >
            {pokemon.name.toUpperCase()}
          </Box>
          <Box sx={dataBoxStyle}>
            <Typography sx={fontSizing}>EXP</Typography>
            <Typography sx={fontSizing}>{pokemon.base_experience}</Typography>
          </Box>
          <Box sx={dataBoxStyle}>
            <Typography sx={fontSizing}>Type(s)</Typography>
            {pokemon.types.map((element) => {
              return (
                <Typography
                  sx={{ fontSize: pokemon.types[1] ? "0.45rem" : "0.75rem" }}
                  key={`type ${element.type.name} ${pokemon.name}`}
                >
                  {element.type.name.toUpperCase()}
                </Typography>
              );
            })}
          </Box>
          <Box sx={dataBoxStyle}>
            <Typography sx={fontSizing}>Weight</Typography>
            <Typography sx={fontSizing}>{pokemon.weight}</Typography>
          </Box>
          <Box sx={dataBoxStyle}>
            <Typography sx={fontSizing}>Height</Typography>
            <Typography sx={fontSizing}>{pokemon.height}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function backgroundColorChecker(type) {
  let color;
  const arrayOfTypeColors = [
    { type: "bug", color: "#1c4b27" },
    { type: "dark", color: "#040707" },
    { type: "dragon", color: "#448a95" },
    { type: "electric", color: "#fafa72" },
    { type: "fairy", color: "#961a45" },
    { type: "fighting", color: "#ef6239" },
    { type: "fire", color: "#fd4b5a" },
    { type: "flying", color: "#94b2c7" },
    { type: "ghost", color: "#33336b" },
    { type: "grass", color: "#27cb50" },
    { type: "ground", color: "#6e491f" },
    { type: "ice", color: "#d8f0fa" },
    { type: "normal", color: "#ca98a6" },
    { type: "poison", color: "#9b69da" },
    { type: "psychic", color: "#a62a6c" },
    { type: "rock", color: "#48190b" },
    { type: "steel", color: "#60756e" },
    { type: "water", color: "#1552e1" },
  ];
  arrayOfTypeColors.forEach((arrType) => {
    if (arrType.type === type) {
      color = arrType.color;
    }
  });
  return color;
}
