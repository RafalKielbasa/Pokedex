import React, { useEffect, useState } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";

import { fetchData, fetchPokemonData, fetchDataToFilter } from "src/api";
import { MyPagination, PokemonCard, PokemonCardContainer, Searcher } from "./components";

import { filterFnc } from "src/helpers/filterFnc";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [searchedValue, setSearchedValue] = useState("");
  const [createComponentData, setCreateComponentData] = useState(null);

  const { data: pokemons, status } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => fetchData((page - 1) * 15),
    enabled: searchedValue === "",
    cacheTime: 0,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  const { data: pokemonsToFilter } = useQuery({
    queryKey: ["pokemonsToFilter"],
    queryFn: () => fetchDataToFilter(),
    enabled: searchedValue !== "",
    cacheTime: 0,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  useEffect(() => {
    pokemons && searchedValue === "" && setCreateComponentData(pokemons?.data?.results);
    pokemonsToFilter &&
      searchedValue !== "" &&
      setCreateComponentData(filterFnc(pokemonsToFilter?.data?.results, searchedValue));
  }, [pokemons, pokemonsToFilter, searchedValue]);
  const resultList = createComponentData ? createComponentData : [];
  const pokemonQueries = useQueries({
    queries: resultList?.map((pokemon) => {
      return {
        queryKey: ["pokemon", pokemon.name],
        queryFn: () => fetchPokemonData(pokemon.url),
        cacheTime: 0,
        retry: false,
        refetchOnMount: false,
        retryOnMount: false,
        staleTime: 10 * (60 * 1000),
      };
    }),
  });

  return (
    <>
      {status === "success" && (
        <>
          <Searcher handleSearcherChange={(e) => setSearchedValue(e.target.value)} />
          <PokemonCardContainer>
            {pokemonQueries.length !== 0 ? (
              pokemonQueries?.map(
                (value) =>
                  value?.status === "success" && (
                    <PokemonCard
                      key={value?.data?.data?.id}
                      id={value?.data?.data?.id}
                      value={value}
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
