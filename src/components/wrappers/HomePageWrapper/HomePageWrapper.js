import { Pagination, TextField } from "@mui/material";
import { PokemonCard } from "../../PokemonCard/PokemonCard";
import {
  Header,
  PageWrapper,
  PaginationWrapper,
  PokemonWrapper,
} from "./HomePageWrapper.styles";
import { useState } from "react";

export const HomePageWrapper = ({ pokemonData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const pageNumber = Math.ceil(pokemonData?.length / pageSize);
  const lastPostIndex = currentPage * pageSize;
  const firstPostIndex = lastPostIndex - pageSize;
  const currentPost = pokemonData?.slice(firstPostIndex, lastPostIndex);

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
