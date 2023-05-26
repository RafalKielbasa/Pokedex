import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import PokemonCard from "src/Components/PokemonCards";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { getFavorites } from "src/api/source";
import { useLogic } from "src/Pages/HomePage";

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

  const queryFavoritesData = useQuery(["favorites"], () => getFavorites());
  const { data } = queryFavoritesData;

  const favorites = data?.data;
  const favoritesIds = favorites?.map((item) => item.id);

  // console.log(`favorites`, favorites);
  // console.log(`favoritesIds`, favoritesIds);
  // console.log(`data`, data);

  return (
    <FavoritePageWrapper>
      <PaginationWrapper>
        {/* <Box component="form" noValidate autoComplete="off">
          <TextField
            size="small"
            id="outlined-basic"
            label="Search"
            variant="outlined"
            sx={{ marginRight: "400px" }}
          />
        </Box> */}

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
