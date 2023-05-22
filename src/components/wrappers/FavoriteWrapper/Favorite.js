import { useState } from "react";
import { useFavoritesQuery } from "../../../hooks/useFavorites";
import { PokemonCard } from "../../PokemonCard/PokemonCard";
import {
  PaginationWrapper,
  PokemonWrapper,
} from "../HomePageWrapper/HomePageWrapper.styles";

import { H1 } from "./Favorite.style";
import { PageWrapper } from "../PokemonDetailsWrapper/PokemonDetailsWrapper.style";
import { Pagination } from "@mui/material";

export const Favorite = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useFavoritesQuery(currentPage);
  //<H1>There is nothing here yet</H1>
  // console.log(data?.data);
  return (
    <PageWrapper>
      <PokemonWrapper>
        {data?.data?.map((pokemon) => {
          return <PokemonCard props={pokemon} />;
        })}
        ;
      </PokemonWrapper>
      <PaginationWrapper>
        <Pagination count={1} size="large" />
      </PaginationWrapper>
    </PageWrapper>
  );
};
