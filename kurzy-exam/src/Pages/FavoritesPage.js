import React from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import PokemonCard from "src/Components/PokemonCards";
import styled, { css } from "styled-components";
import { useQuery } from "react-query";
import { getFavorites } from "src/api/source";
import { ThemeContext } from "src/context/ThemeContext";
import { useEffect, useState, useContext } from "react";
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
  const [battle, setBattle] = useState([]);
  const [battleIds, setBattleIds] = useState([]);

  const { theme } = useContext(ThemeContext);
  const { toggleTheme, isDark } = useContext(ThemeContext);
  const queryFavoritesData = useQuery(["favorites"], () => getFavorites());
  const { data } = queryFavoritesData;

  const favorites = data?.data;
  const favoritesIds = favorites?.map((item) => item.id);

  const getBattle = async () => {
    const response = await axios.get(`http://localhost:3001/battle/`);
    setBattle(response.data);
    const getBattleIds = response?.data?.map((item) => item.id);
    setBattleIds(getBattleIds);
  };

  useEffect(() => {
    getBattle();
  }, []);

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
          {favorites.map((item, index) => (
            <PokemonCard
              key={index}
              id={item.id}
              pic={item.pic}
              name={item.name}
              height={item.height}
              baseexp={item.baseexp}
              weight={item.weight}
              abilitie={item.abilitie}
              favorites={favorites}
              favoritesIds={favoritesIds}
              battle={battle}
              battleIds={battleIds}
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
