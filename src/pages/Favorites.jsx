import { useTheme } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "../components/Card";
import styled from "styled-components";

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: top;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.contrast};
`;

const Heading = styled.h1`
  color: black;
`;

export default function Favorites({ favorites, setFavorites }) {
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:3001/favorites")
      .then((response) => setFavorites(response?.data?.map((item) => item.id)))
      .catch((error) => console.log("ulub", error));
  }, []);

  return (
    <Container theme={theme}>
      {favorites.length >= 1 ? (
        favorites.map((item) => {
          return (
            <Card
              key={item}
              url={`https://pokeapi.co/api/v2/pokemon/${item}`}
              gate={false}
            />
          );
        })
      ) : (
        <Heading>no favorite pokemon</Heading>
      )}
    </Container>
  );
}
