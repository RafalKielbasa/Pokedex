import { Pagination, TextField } from "@mui/material";
import { PokemonCard } from "../../PokemonCard/PokemonCard";
import {
  Header,
  PageWrapper,
  PaginationWrapper,
  PokemonWrapper,
} from "./HomePageWrapper.styles";

export const HomePageWrapper = () => {
  return (
    <PageWrapper>
      <Header>
        <TextField placeholder="Search" variant="outlined" />
      </Header>
      <PokemonWrapper>
        {new Array(15).fill(true).map((_, index) => (
          <PokemonCard key={index} />
        ))}
      </PokemonWrapper>
      <PaginationWrapper>
        <Pagination count={10} size="large" />
      </PaginationWrapper>
    </PageWrapper>
  );
};
