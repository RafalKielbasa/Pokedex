import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { ProjectUrl } from "../../const/ProjectUrl";

export const PokemonDetails = (props) => {
  const { name, height, base_experience, weight, ability, img } = props;

  return (
    <div>
      <span>Pokemon Details</span>
      <h1>POKEDEX</h1>
      <div>
        <div></div>
        <div>
          <h2></h2>
          <div></div>
        </div>
      </div>
      <Stack direction="row" spacing={2}>
        <Link to={ProjectUrl.Home}>
          <Button>Back to homepage</Button>
        </Link>
      </Stack>
    </div>
  );
};
