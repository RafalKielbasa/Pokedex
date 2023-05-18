import { Pagination, TextField } from "@mui/material";
import { PokemonCard } from "../../PokemonCard/PokemonCard";
import {
  Header,
  PageWrapper,
  PaginationWrapper,
  PokemonWrapper,
} from "./HomePageWrapper.styles";
import { useAllPokemonQuery } from "../../../hooks/useAllPokemon";
import { useState } from "react";

export const HomePageWrapper = () => {
  const pokemons = useAllPokemonQuery();
  const data = pokemons?.data?.data;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const pageNumber = Math.ceil(data?.length / pageSize);
  const lastPostIndex = currentPage * pageSize;
  const firstPostIndex = lastPostIndex - pageSize;
  const currentPost = data.slice(firstPostIndex, lastPostIndex);

  const handleChange = (_, i) => {
    setCurrentPage(i);
  };

  return (
    <PageWrapper>
      <Header>
        <TextField placeholder="Search" variant="outlined" />
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
