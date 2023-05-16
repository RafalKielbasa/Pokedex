import { useTheme } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "../components/Card";
import styled from "styled-components";

const StyledBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    <StyledBox style={{ backgroundColor: theme.palette.background.contrast }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {favorites.length >= 1 ? (
          favorites.map((item) => {
            console.log(item);
            return <Card key={item} pokemon={item} gate={false} />;
          })
        ) : (
          <Heading>no favorite pokemon</Heading>
        )}
      </Box>
    </StyledBox>
  );
};
export default Favorites;
