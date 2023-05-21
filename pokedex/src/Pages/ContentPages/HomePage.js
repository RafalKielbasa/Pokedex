import React, { useState, useEffect } from "react";
import { filterFnc } from "src/helpers";
import { useQuery, useQueries } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import {
  fetchDataFromPage,
  fetchPokemonQueriesData,
  fetchDataToFilter,
} from "src/api/fetchDataFunctions";
import { MyPagination, PokemonCard, PokemonCardContainer, Searcher } from "../components";

const HomePage = () => {
  const { editedList, editedStatus } = useOutletContext();
  const [createComponentData, setCreateComponentData] = useState(null);
  const [page, setPage] = useState(1);
  const [searchedValue, setSearchedValue] = useState("");

  const { data: pokemons, status: pokemonsStatus } = useQuery({
    queryKey: ["pokemons", page],
    enabled: editedStatus === "success" && searchedValue === "",
    queryFn: () => fetchDataFromPage((page - 1) * 15, editedList),
    staleTime: 10 * (60 * 1000),
  });
  const { data: pokemonsToFilter, status: pokemonsToFilterStatus } = useQuery({
    queryKey: ["pokemonsToFilter"],
    queryFn: () => fetchDataToFilter(editedList),
    enabled: editedStatus === "success" && searchedValue !== "",
    staleTime: 10 * (60 * 1000),
  });

  useEffect(() => {
    pokemons && searchedValue === "" && setCreateComponentData(pokemons);
    pokemonsToFilter &&
      searchedValue !== "" &&
      setCreateComponentData(filterFnc(pokemonsToFilter, searchedValue));
  }, [pokemons, pokemonsToFilter, searchedValue]);

  const resultList = createComponentData ? createComponentData : [];

  const pokemonQueries = useQueries({
    queries: resultList?.map(({ name, url }) => {
      return {
        queryKey: ["pokemon", name],
        queryFn: () => fetchPokemonQueriesData(url),
        staleTime: 10 * (60 * 1000),
      };
    }),
  });
  if (
    (searchedValue === "" && pokemonsStatus === "loading") ||
    (searchedValue !== "" && pokemonsToFilterStatus === "loading")
  )
    return <div>... LOADING</div>;
  return (
    <div>
      {(pokemonsStatus === "success" || pokemonsToFilterStatus === "success") && (
        <>
          <Searcher handleSearcherChange={(e) => setSearchedValue(e.target.value)} />
          <PokemonCardContainer>
            {pokemonQueries && pokemonQueries?.length > 0 ? (
              pokemonQueries?.map(
                ({ data, status }) =>
                  status === "success" && <PokemonCard key={data?.id} id={data?.id} value={data} />
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
    </div>
  );
};

export default HomePage;
