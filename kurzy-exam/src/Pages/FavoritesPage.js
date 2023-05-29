import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import PokemonCard from "src/Components/PokemonCards";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { getFavorites } from "src/api/source";

const FavoritePageWrapper = styled.div`
  margin-bottom: 20px;
  padding: 0px 40px 0px 40px;
`;
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

const FavoritesPage = () => {
  const [page, setPage] = useState(1);
  const [battle, setBattle] = useState([]);
  const [battleIds, setBattleIds] = useState([]);

  const queryFavoritesData = useQuery(["favorites"], () => getFavorites());
  const { data } = queryFavoritesData;

  const favorites = data?.data;
  const favoritesIds = favorites?.map((item) => item.id);

  const getBattle = async () => {
    const response = await axios.get(`http://localhost:3000/battle/`);
    setBattle(response.data);
    const getBattleIds = response?.data?.map((item) => item.id);
    setBattleIds(getBattleIds);
  };

  useEffect(() => {
    getBattle();
  }, []);

  return (
    <FavoritePageWrapper>
      <PaginationWrapper>
        <Stack spacing={2}>
          <Pagination
            page={page}
            count={1}
            variant="outlined"
            shape="rounded"
            sx={{ marginBottom: 2 }}
          />
        </Stack>
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
        <Stack spacing={2}>
          <Pagination
            page={page}
            count={1}
            variant="outlined"
            shape="rounded"
            sx={{ marginTop: 2 }}
          />
        </Stack>
      </PaginationWrapper>
    </FavoritePageWrapper>
  );
};
export default FavoritesPage;
