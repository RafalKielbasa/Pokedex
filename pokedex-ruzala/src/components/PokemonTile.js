import { Box, Typography } from "@mui/material";
import FavoritesButton from "./FavoritesButton";
import { useNavigate } from "react-router-dom";

export default function PokemonTile({ pokemon }) {
  const navigate = useNavigate();
  const dataBoxStyle = {
    display: "flex",
    alignItems: "center",
    width: "40%",
    flexDirection: "column",
    margin: "0px 10px 20px 10px",
    background: "rgba(0, 0, 0, 0.2)",
    border: "3px solid lightblue",
    borderRadius: "10px",
  };

  const singleTypePokemonTile = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "300px",
    width: "250px",
    color: "white",
    margin: 2,
    boxShadow: "5px 5px 5px black",
    border: "5px solid lightblue",
    borderRadius: "10px",
    background: `${backgroundColorChecker(pokemon.types[0].type.name)}`,
    "&:hover": { boxShadow: "1px 1px 5px black" },
  };

  const dualTypePokemonTile = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "300px",
    width: "250px",
    backgroundColor: "black",
    color: "white",
    margin: 2,
    boxShadow: "5px 2px 10px black",
    border: "5px solid lightblue",
    borderRadius: "10px",
    background:
      pokemon.types[1] &&
      `linear-gradient(to right, ${backgroundColorChecker(
        pokemon.types[1].type.name
      )} 40%,${backgroundColorChecker(pokemon.types[0].type.name)} 55%)`,
    "&:hover": { boxShadow: "1px 1px 5px black" },
  };

  const scaling = 0.5;
  return (
    <Box
      sx={{
        position: "relative",
        "&:hover": { transform: "scale(1.07)" },
      }}
      id="box"
    >
      <FavoritesButton pokemon={pokemon} />
      <Box
        sx={{ position: "absolute", top: "30px", left: "30px" }}
      >{`#${pokemon.id}`}</Box>
      <Box
        sx={pokemon.types[1] ? dualTypePokemonTile : singleTypePokemonTile}
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
            margin: 1,
            background: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
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
        >
          <Box sx={dataBoxStyle}>
            <Typography sx={{ fontSize: "10px" }}>NAME</Typography>
            <Typography
              sx={{ fontSize: pokemon.name.length < 15 ? "15px" : "10px" }}
            >
              {pokemon.name.toUpperCase()}
            </Typography>
          </Box>
          <Box sx={dataBoxStyle}>
            <Typography sx={{ fontSize: "10px" }}>Type(s)</Typography>
            {pokemon.types.map((element) => {
              return <Typography>{element.type.name.toUpperCase()}</Typography>;
            })}
          </Box>
          <Box sx={dataBoxStyle}>
            <Typography sx={{ fontSize: "10px" }}>Weight</Typography>
            <Typography sx={{ fontSize: "15px" }}>{pokemon.weight}</Typography>
          </Box>
          <Box sx={dataBoxStyle}>
            <Typography sx={{ fontSize: "10px" }}>Height</Typography>
            <Typography sx={{ fontSize: "15px" }}>{pokemon.height}</Typography>
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
