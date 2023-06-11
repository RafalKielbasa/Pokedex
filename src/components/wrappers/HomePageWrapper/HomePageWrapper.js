import { TextField } from "@mui/material";
import { PokemonCard } from "../../PokemonCard/PokemonCard";
import {
  Header,
  PageWrapper,
  PaginationWrapper,
  PokemonWrapper,
} from "./HomePageWrapper.styles";
import { usePaginationQuery } from "../../../hooks/usePagination";
import { useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { PagePagination } from "../../PagePagination";
import { v4 } from "uuid";

export const HomePageWrapper = ({ pokemonData }) => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");
  const debouncedSearch = useDebounce(value);
  const { data: paginatedPokemons } = usePaginationQuery(offset, limit);

  console.log("pagination", paginatedPokemons);

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
          ? pokemonData
              ?.filter((pokemon) => {
                return pokemon.name.startsWith(debouncedSearch)
                  ? pokemon
                  : null;
              })
              .map((pokemon) => {
                return <PokemonCard props={pokemon} key={v4()} />;
              })
          : paginatedPokemons?.map((pokemon) => {
              return <PokemonCard props={pokemon} key={v4()} />;
            })}
      </PokemonWrapper>
      <PaginationWrapper>
        {!value ? (
          <PagePagination
            setPage={setPage}
            page={page}
            setOffset={setOffset}
            offset={offset}
            limit={limit}
            setLimit={setLimit}
          />
        ) : null}
      </PaginationWrapper>
    </PageWrapper>
  );
};
