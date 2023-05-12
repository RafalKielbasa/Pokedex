import React from "react";

import {
  MyPagination,
  PokemonCard,
  PokemonCardContainer,
  Searcher,
} from "./components";

const HomePage = ({
  page,
  setPage,
  searchedValue,
  setSearchedValue,
  status,
  pokemonQueries,
}) => {
  return (
    <>
      {status === "success" && (
        <>
          <Searcher
            handleSearcherChange={(e) => setSearchedValue(e.target.value)}
          />
          <PokemonCardContainer>
            {pokemonQueries.length !== 0 ? (
              pokemonQueries?.map(
                ({ data, status }) =>
                  status === "success" && (
                    <PokemonCard
                      key={data?.data?.id}
                      id={data?.data?.id}
                      value={data}
                    />
                  )
              )
            ) : (
              <h1> BRAK DOPASOWAŃ</h1>
            )}
          </PokemonCardContainer>
          {searchedValue === "" && (
            <MyPagination
              count={11}
              pageNumber={page}
              paginationHanldeClick={(e, p) => setPage(p)}
            />
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
