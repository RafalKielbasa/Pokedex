import React from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import PokemonCard from "src/Components/PokemonCards";
import styled, { css } from "styled-components";
import { AppContext } from "src/context/AppContext";
import { useState, useEffect, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const FavoritePageWrapper = styled("div")(
  ({ theme }) =>
    css`
      margin-bottom: 20px;
      padding: 0px 40px 0px 40px;
      height: 100vh;
      background-color: ${theme.bgColor};
    `
);
const PaginationWrapper = styled.div`
  display: flex;
  align-items: top;
  justify-content: flex-end;
  padding-right: 38px;
`;
const PokemonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const InfoWrapper = styled.h1`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
const theme2 = createTheme({
  palette: {
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const FavoritesPage = () => {
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [changeFav, setChangeFav] = useState(false);

  const { theme, toggleTheme, isDark, battleIds } = useContext(AppContext);

  useEffect(() => {
    const getFavorites = async () => {
      const response = await axios.get(`http://localhost:3001/favoriteData/`);
      setFavorites(response?.data);
    };
    getFavorites();
  }, [changeFav]);

  const change = () => {
    setChangeFav((prev) => !prev);
  };

  return (
    <FavoritePageWrapper theme={theme}>
      <PaginationWrapper>
        <ThemeProvider theme={theme2}>
          <Stack spacing={2}>
            <Pagination
              page={page}
              count={1}
              variant="outlined"
              shape="rounded"
              sx={{ marginBottom: 2 }}
              color={isDark ? "secondary" : "primary"}
            />
          </Stack>
        </ThemeProvider>
      </PaginationWrapper>

      {favorites?.length > 0 ? (
        <PokemonWrapper>
          {favorites?.map((item, index) => (
            <PokemonCard
              key={index}
              id={item.id}
              pic={item.pic}
              picDet={item.picDet}
              name={item.name}
              height={item.height}
              baseexp={item.baseexp}
              weight={item.weight}
              abilitie={item.abilitie}
              wins={item.wins}
              onClick={change}
            />
          ))}
        </PokemonWrapper>
      ) : (
        <InfoWrapper>
          <h3>Brak wyników wyszukiwania</h3>
        </InfoWrapper>
      )}

      <PaginationWrapper>
        <ThemeProvider theme={theme2}>
          <Stack spacing={2}>
            <Pagination
              page={page}
              count={1}
              variant="outlined"
              shape="rounded"
              sx={{ marginTop: 2, paddingBottom: 4 }}
              color={isDark ? "secondary" : "primary"}
            />
          </Stack>
        </ThemeProvider>
      </PaginationWrapper>
    </FavoritePageWrapper>
  );
};
export default FavoritesPage;
