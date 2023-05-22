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

export const HomePageWrapper = ({ pokemonData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState("");
  const debouncedSearch = useDebounce(value);
  const { data } = useSearchPokemonQuery(debouncedSearch);
  const pagination = usePaginationQuery(currentPage);
  const pageNumber = Math.ceil(pokemonData?.length / 15);

  const pokemon = useMemo(() => {
    if (debouncedSearch) {
      return data?.data;
    } else {
      return pagination?.data?.data;
    }
  });

  const handleChange = (_, i) => {
    setCurrentPage(i);
  };

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
        <Pagination count={pageNumber} size="large" onChange={handleChange} />
      </PaginationWrapper>
    </PageWrapper>
  );
};
