import { Pagination, TextField } from "@mui/material";
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

export const HomePageWrapper = ({ pokemonData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const pageNumber = Math.ceil(pokemonData?.length / pageSize);
  const lastPostIndex = currentPage * pageSize;
  const firstPostIndex = lastPostIndex - pageSize;
  const currentPost = pokemonData?.slice(firstPostIndex, lastPostIndex);

  const [value, setValue] = useState("");
  const debouncedSearch = useDebounce(value);
  const { data } = useSearchPokemonQuery(debouncedSearch);

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
        {data?.data?.map((props) => {
          return <PokemonCard props={props} />;
        })}
      </Header>
      <PokemonWrapper>
        {currentPost?.map((props) => {
          return <PokemonCard props={props} />;
        })}
      </PokemonWrapper>
      <PaginationWrapper>
        <Pagination count={pageNumber} size="large" onChange={handleChange} />
      </PaginationWrapper>
    </PageWrapper>
  );
};
