import { Pagination } from "@mui/material";
import { PokemonCard } from "../../PokemonCard/PokemonCard";
import { Wrapper } from "./EditAndLogoutWrapper.style";
import {
  PageWrapper,
  PaginationWrapper,
} from "../HomePageWrapper/HomePageWrapper.styles";

export const EditAndLogoutWrapper = () => {
  return (
    <PageWrapper>
      <Wrapper>
        {new Array(15).fill(true).map((_, index) => (
          <PokemonCard key={index} />
        ))}
      </Wrapper>
      <PaginationWrapper>
        <Pagination count={10} size="large" />
      </PaginationWrapper>
    </PageWrapper>
  );
};
