import { Wrapper } from "./EditAndLogoutWrapper.style";
import {
  PageWrapper,
  PaginationWrapper,
} from "../HomePageWrapper/HomePageWrapper.styles";
import { usePaginationQuery } from "../../../hooks/usePagination";
import { useState } from "react";
import { PagePagination } from "../../PagePagination";
import { PokemonCardEdit } from "../../PokemonCardList/PokemonCardEdit";
import { useAllPokemonQuery } from "../../../hooks/useAllPokemon";
import { v4 } from "uuid";

export const EditAndLogoutWrapper = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = usePaginationQuery("pokemon", currentPage);
  const { data: AllPokemons } = useAllPokemonQuery();

  return (
    <PageWrapper>
      <Wrapper>
        {data?.data?.map((pokemon) => {
          return <PokemonCardEdit key={v4()} props={pokemon} />;
        })}
      </Wrapper>
      <PaginationWrapper>
        <PagePagination
          setCurrentPage={setCurrentPage}
          pokemonData={AllPokemons?.data}
        />
      </PaginationWrapper>
    </PageWrapper>
  );
};
