import { Box, Button } from "@mui/material";
import PokemonTile from "../components/PokemonTile";
import PokemonTileDummy from "../components/PokemonTileDummy";

const arenaSwitchCase = (setComponentToRender, arrayOfArenaPokemon) => {
  switch (arrayOfArenaPokemon.data.length) {
    case 1:
      setComponentToRender(
        <Box>
          <Box sx={{ width: "100%" }}>
            <PokemonTile
              key={`${arrayOfArenaPokemon.data[0].name}_arena_tile`}
              pokemon={arrayOfArenaPokemon.data[0]}
            />
            <PokemonTileDummy />
          </Box>
          <Button disabled variant="contained">
            Walcz!
          </Button>
          <Button variant="contained">Wyczyść arenę.</Button>
        </Box>
      );
      break;
    case 2:
      setComponentToRender(
        <Box>
          <Box sx={{ width: "100%" }}>
            {arrayOfArenaPokemon.data.map((element) => {
              return (
                <PokemonTile
                  key={`${element.name}_arena_tile`}
                  pokemon={element}
                />
              );
            })}
          </Box>
          <Button
            disabled={arrayOfArenaPokemon.length !== 2}
            variant="contained"
          >
            Walcz!
          </Button>
          <Button
            disabled={(arrayOfArenaPokemon.length = 0)}
            variant="contained"
          >
            Wyczyść arenę.
          </Button>
        </Box>
      );
      break;
    default:
      setComponentToRender(
        <Box>
          <Box sx={{ width: "100%" }}>
            <PokemonTileDummy />
            <PokemonTileDummy />
          </Box>
          <Button disabled variant="contained">
            Walcz!
          </Button>
          <Button variant="contained">Wyczyść arenę.</Button>
        </Box>
      );
  }
};

export default arenaSwitchCase;
