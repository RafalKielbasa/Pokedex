import React, { useState, useEffect } from "react";
import { filterFnc } from "src/helpers";
import { useQuery, useQueries, useQueryClient } from "@tanstack/react-query";
import { fetchData, fetchPokemonData, fetchDataToFilter, fetchEdited } from "src/api";
import { MyPagination, PokemonCard, PokemonCardContainer, Searcher } from "../components";
import { useOutletContext } from "react-router-dom";

const HomePage = () => {
  const [page, setPage, searchedValue, setSearchedValue] = useOutletContext();
  const [createComponentData, setCreateComponentData] = useState(null);
  const queryClient = useQueryClient();
  const { data: edited, status: editedStatus } = useQuery({
    queryKey: ["editedPokemons"],
    queryFn: () => fetchEdited(),
    staleTime: 10 * (60 * 1000),
  });
  const editedList = edited?.map((value) => value.name);
  editedList?.forEach((value, index) => {
    queryClient.setQueryData(["pokemon", value], edited[index]);
  });
  const { data: pokemons } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => fetchData((page - 1) * 15),
    enabled: searchedValue === "",
    staleTime: 10 * (60 * 1000),
  });
  const { data: pokemonsToFilter } = useQuery({
    queryKey: ["pokemonsToFilter"],
    queryFn: () => fetchDataToFilter(),
    enabled: searchedValue !== "",
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
    queries: resultList?.map(({ name, url }) => {
      return {
        queryKey: ["pokemon", name],
        queryFn: () => fetchPokemonData(url),
        enabled: !editedList?.includes(name),
        staleTime: 10 * (60 * 1000),
      };
    }),
  });
  const allPokemonQueriesStatus =
    pokemonQueries.length > 0 && pokemonQueries?.every((value) => value?.status === "success");

  if (!allPokemonQueriesStatus) return <div> ...LOADIMG</div>;

  return (
    <div>
      {editedStatus === "success" && allPokemonQueriesStatus && (
        <>
          <Searcher handleSearcherChange={(e) => setSearchedValue(e.target.value)} />
          <PokemonCardContainer>
            {pokemonQueries?.length !== 0 ? (
              pokemonQueries?.map(({ data }) => (
                <PokemonCard key={data?.id} id={data?.id} value={data} />
              ))
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
