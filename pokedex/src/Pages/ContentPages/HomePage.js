import React, { useState, useEffect } from "react";

import { useQuery, useQueries } from "@tanstack/react-query";

import { useOutletContext } from "react-router-dom";

import { filterFnc } from "src/helpers";

import {
  fetchDataFromPage,
  fetchPokemonQueriesData,
  fetchDataToFilter,
} from "src/api/fetchDataFunctions";

import { MyPagination, NoMatch, PageHeader } from "src/components/exlusiveHomePageComponents";
import { Loader, ErrorMsg } from "src/components/loaders";
import { BasicPokemonLayout } from "src/components/layouts";
import { PokemonCard } from "src/components/cards";
import { PokemonCardContainer } from "src/components/cardContainers";

const HomePage = () => {
  const { editedList, editedStatus } = useOutletContext();

  const [showOnlyLocalPokemons, setShowOnlyLocalPokemons] = useState(false);
  const [createComponentData, setCreateComponentData] = useState(null);
  const [page, setPage] = useState(1);
  const [searchedValue, setSearchedValue] = useState("");

  const {
    data: pokemons,
    status: pokemonsStatus,
    error: pokemonsError,
  } = useQuery({
    queryKey: ["pokemons", page],
    enabled: editedStatus === "success" && searchedValue === "",
    queryFn: () => fetchDataFromPage((page - 1) * 15, editedList),
    staleTime: 10 * (60 * 1000),
  });

  const {
    data: pokemonsToFilter,
    status: pokemonsToFilterStatus,
    error: pokemonsToFilterError,
  } = useQuery({
    queryKey: ["pokemonsToFilter"],
    queryFn: () => fetchDataToFilter(editedList),
    enabled: editedStatus === "success" && searchedValue !== "",
    staleTime: 10 * (60 * 1000),
  });

  useEffect(() => {
    const localData =
      editedList &&
      editedList?.map((value) => {
        const editedObjectList = {
          name: value,
          url: `http://localhost:3000/edited/${value}`,
        };
        return editedObjectList;
      });
    searchedValue === "" && pokemons && !showOnlyLocalPokemons && setCreateComponentData(pokemons);
    searchedValue !== "" &&
      pokemonsToFilter &&
      !showOnlyLocalPokemons &&
      setCreateComponentData(filterFnc(pokemonsToFilter, searchedValue));
    showOnlyLocalPokemons && setCreateComponentData(localData);
  }, [pokemons, pokemonsToFilter, searchedValue, showOnlyLocalPokemons, editedList]);
  useEffect(() => {
    searchedValue !== "" && setShowOnlyLocalPokemons(false);
  }, [setShowOnlyLocalPokemons, searchedValue]);

  const resultList = createComponentData ? createComponentData : [];
  const pokemonQueries = useQueries({
    queries: resultList?.map(({ name, url }) => {
      return {
        queryKey: ["pokemon", name],
        queryFn: () => fetchPokemonQueriesData(url, editedList, name),
        staleTime: 10 * (60 * 1000),
      };
    }),
  });
  if (searchedValue === "" && pokemonsStatus === "loading") return <Loader />;

  if (pokemonsStatus === "error") return <ErrorMsg errorMsg={pokemonsError.message} />;
  if (pokemonsToFilterStatus === "error")
    return <ErrorMsg errorMsg={pokemonsToFilterError.message} />;

  return (
    <BasicPokemonLayout>
      {(pokemonsStatus === "success" || pokemonsToFilterStatus === "success") && (
        <>
          <PageHeader
            checkedValue={showOnlyLocalPokemons}
            handleSearcherChange={(e) => setSearchedValue(e.target.value)}
            toggleOnlyLocalPokemonsHandle={() => setShowOnlyLocalPokemons((prev) => !prev)}
          />
          <PokemonCardContainer>
            {pokemonQueries && pokemonQueries?.length > 0 ? (
              pokemonQueries?.map(
                ({ data, status }) =>
                  status === "success" && <PokemonCard key={data?.id} id={data?.id} value={data} />
              )
            ) : (
              <NoMatch value={"BRAK DOPASOWAŃ"} />
            )}
          </PokemonCardContainer>
          {!showOnlyLocalPokemons && searchedValue === "" && (
            <MyPagination
              count={11}
              pageNumber={page}
              paginationHanldeClick={(e, p) => setPage(p)}
            />
          )}
        </>
      )}
    </BasicPokemonLayout>
  );
};

export default HomePage;
