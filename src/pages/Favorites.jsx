import { useTheme } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import PokemonCard from "../components/PokemonCard";
import styled from "styled-components";

const StyledBox = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.palette.background.contrast};
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Heading = styled.h1`
  color: black;
`;

const Favorites = ({ favorites, setFavorites }) => {
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:3001/favorites")
      .then((response) => setFavorites(response?.data))
      .catch((error) => console.log("ulub", error));
  }, []);

  return (
    <StyledBox theme={theme}>
      <StyledList>
        {favorites.length >= 1 ? (
          favorites.map((item) => {
            return <PokemonCard key={item} pokemon={item} gate={false} />;
          })
        ) : (
          <Heading>no favorite pokemon</Heading>
        )}
      </StyledList>
    </StyledBox>
  );
};
export default Favorites;
