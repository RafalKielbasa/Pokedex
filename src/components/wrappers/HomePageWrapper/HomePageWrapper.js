import { Pagination, TextField } from "@mui/material";
import { PokemonCard } from "../../PokemonCard/PokemonCard";
import {
  Header,
  PageWrapper,
  PaginationWrapper,
  PokemonWrapper,
} from "./HomePageWrapper.styles";
import { useMemo, useState } from "react";
import { useSearchPokemonQuery } from "../../../hooks/useSearchPokemon";
import { useDebounce } from "../../../hooks/useDebounce";
import { usePaginationQuery } from "../../../hooks/usePagination";
import { PagePagination } from "../../PagePagination";

export const HomePageWrapper = ({ pokemonData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState("");
  const debouncedSearch = useDebounce(value);
  const { data } = useSearchPokemonQuery(debouncedSearch);
  const pagination = usePaginationQuery("pokemon", currentPage);

  const pokemon = useMemo(() => {
    if (debouncedSearch) {
      return data?.data;
    } else {
      return pagination?.data?.data;
    }
  });

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
        {pokemon?.length > 0 ? (
          pokemon?.map((props) => {
            return <PokemonCard props={props} />;
          })
        ) : (
          <h1>Can't find {value}</h1>
        )}
      </PokemonWrapper>
      <PaginationWrapper>
        <PagePagination
          setCurrentPage={setCurrentPage}
          pokemonData={pokemonData}
        />
      </PaginationWrapper>
    </PageWrapper>
  );
};
