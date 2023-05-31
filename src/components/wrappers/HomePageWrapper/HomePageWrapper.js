import { TextField } from "@mui/material";
import { PokemonCard } from "../../PokemonCard/PokemonCard";
import {
  Header,
  PageWrapper,
  PaginationWrapper,
  PokemonWrapper,
} from "./HomePageWrapper.styles";
import { useState } from "react";
import { useSearchPokemonQuery } from "../../../hooks/useSearchPokemon";
import { useDebounce } from "../../../hooks/useDebounce";
import { usePaginationQuery } from "../../../hooks/usePagination";
import { PagePagination } from "../../PagePagination";
import { v4 } from "uuid";

export const HomePageWrapper = ({ pokemonData }) => {
  const [page, setPage] = useState();
  const [value, setValue] = useState("");
  const debouncedSearch = useDebounce(value);
  const { data: searchPokemon } = useSearchPokemonQuery(debouncedSearch);
  const { data: allPokemon } = usePaginationQuery("pokemon", page);

  return (
    <PageWrapper>
      <Header>
        <TextField
          placeholder="Search"
          variant="outlined"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </Header>
      <PokemonWrapper>
        {value?.length > 0
          ? searchPokemon?.data?.map((pokemon) => {
              return <PokemonCard props={pokemon} key={v4()} />;
            })
          : allPokemon?.data?.map((pokemon) => {
              return <PokemonCard props={pokemon} key={v4()} />;
            })}
      </PokemonWrapper>
      <PaginationWrapper>
        <PagePagination setCurrentPage={setPage} pokemonData={pokemonData} />
      </PaginationWrapper>
    </PageWrapper>
  );
};
