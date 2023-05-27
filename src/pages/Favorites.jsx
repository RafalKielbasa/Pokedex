import { styled, css } from "@mui/material";

import PokemonCard from "../components/PokemonCard";
import { useFetchLocalApi } from "../hooks/useFetchLocalApi";

const StyledBox = styled("div")(
  ({ theme }) =>
    css`
      height: 100%;
      background-color: ${theme.palette.background.contrast};
    `
);

const StyledList = styled("div")(
  css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  `
);

const Heading = styled("h1")(
  css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  `
);

const Favorites = () => {
  const { items: favorites } = useFetchLocalApi("favorites");

  const { items: editedPokemonList } = useFetchLocalApi("editedPokemon");

  return (
    <StyledBox>
      <StyledList>
        {favorites?.length > 0 ? (
          favorites.map((item) => (
            <PokemonCard
              key={item.id}
              pokemon={item}
              editedPokemonList={editedPokemonList}
            />
          ))
        ) : (
          <Heading>no favorite pokemon</Heading>
        )}
      </StyledList>
    </StyledBox>
  );
};
export default Favorites;
