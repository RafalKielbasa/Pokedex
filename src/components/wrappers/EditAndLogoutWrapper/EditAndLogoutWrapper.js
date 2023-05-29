import { PokemonCard } from "../../PokemonCard/PokemonCard";
import { Wrapper } from "./EditAndLogoutWrapper.style";
import {
  PageWrapper,
  PaginationWrapper,
} from "../HomePageWrapper/HomePageWrapper.styles";
import { usePaginationQuery } from "../../../hooks/usePagination";
import { useState } from "react";
import { PagePagination } from "../../PagePagination";

export const EditAndLogoutWrapper = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = usePaginationQuery("pokemon", currentPage);

  console.log(data);

  return (
    <PageWrapper>
      <Wrapper>
        {data?.data?.map((pokemon) => {
          return <PokemonCard props={pokemon} />;
        })}
      </Wrapper>
      <PaginationWrapper>
        <PagePagination
          setCurrentPage={setCurrentPage}
          pokemonData={data?.data}
        />
      </PaginationWrapper>
    </PageWrapper>
  );
};
