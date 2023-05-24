import { useState } from "react";
import { useFavoritesQuery } from "../../../hooks/useFavorites";
import { PokemonCard } from "../../PokemonCard/PokemonCard";
import {
  PaginationWrapper,
  PokemonWrapper,
} from "../HomePageWrapper/HomePageWrapper.styles";
import { H1 } from "./Favorite.style";
import { PageWrapper } from "../PokemonDetailsWrapper/PokemonDetailsWrapper.style";
import { PagePagination } from "../../PagePagination";
import { usePaginationQuery } from "../../../hooks/usePagination";

export const Favorite = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = usePaginationQuery("favorites", currentPage);

  if (data?.data?.length === 0) {
    return <H1>There's nothing here yet</H1>;
  } else {
    return (
      <PageWrapper>
        <PokemonWrapper>
          {data?.data?.map((pokemon) => {
            return <PokemonCard props={pokemon} />;
          })}
        </PokemonWrapper>
        <PaginationWrapper>
          <PagePagination
            setCurrentPage={currentPage}
            pokemonData={data?.data}
          />
        </PaginationWrapper>
      </PageWrapper>
    );
  }
};
