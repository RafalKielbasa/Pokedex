import React, { useState, useEffect } from "react";
import { filterFnc } from "src/helpers";
import { useQuery, useQueries, useQueryClient } from "@tanstack/react-query";
import {
  fetchData,
  fetchPokemonData,
  fetchDataToFilter,
  fetchEdited,
} from "src/api";
import {
  MyPagination,
  PokemonCard,
  PokemonCardContainer,
  Searcher,
} from "../components";
import { useOutletContext } from "react-router-dom";

const HomePage = () => {
  const [page, setPage, searchedValue, setSearchedValue] = useOutletContext();
  const [createComponentData, setCreateComponentData] = useState(null);
  const queryClient = useQueryClient();
  const { data: edited } = useQuery({
    queryKey: ["editedPokemons"],
    queryFn: () => fetchEdited(),
    refetchOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  const editedList = edited?.data?.map((value) => value.name);
  editedList?.forEach((value, index) => {
    queryClient.setQueryData(["pokemon", value], { data: edited?.data[index] });
  });
  const { data: pokemons, status } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => fetchData((page - 1) * 15),
    enabled: searchedValue === "",
    refetchOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  const { data: pokemonsToFilter } = useQuery({
    queryKey: ["pokemonsToFilter"],
    queryFn: () => fetchDataToFilter(),
    enabled: searchedValue !== "",
    refetchOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  useEffect(() => {
    pokemons &&
      searchedValue === "" &&
      setCreateComponentData(pokemons?.data?.results);
    pokemonsToFilter &&
      searchedValue !== "" &&
      setCreateComponentData(
        filterFnc(pokemonsToFilter?.data?.results, searchedValue)
      );
  }, [pokemons, pokemonsToFilter, searchedValue]);

  const resultList = createComponentData ? createComponentData : [];
  const pokemonQueries = useQueries({
    queries: resultList?.map(({ name, url }) => {
      return {
        queryKey: ["pokemon", name],
        queryFn: () => fetchPokemonData(url),
        enabled: !editedList?.includes(name),
        refetchOnMount: false,
        staleTime: 10 * (60 * 1000),
      };
    }),
  });
  return (
    <>
      {status === "success" && (
        <>
          <Searcher
            handleSearcherChange={(e) => setSearchedValue(e.target.value)}
          />
          <PokemonCardContainer>
            {pokemonQueries?.length !== 0 ? (
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
