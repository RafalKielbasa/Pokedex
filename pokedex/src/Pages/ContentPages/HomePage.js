import React, { useState, useEffect } from "react";
import { filterFnc } from "src/helpers";
import { useQuery, useQueries } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchData, fetchPokemonData, fetchDataToFilter } from "src/api";
import { MyPagination, PokemonCard, PokemonCardContainer, Searcher } from "../components";

const HomePage = () => {
  const { page, setPage, searchedValue, setSearchedValue, editedList, editedStatus } =
    useOutletContext();
  const [createComponentData, setCreateComponentData] = useState(null);
  const actualPage = (page - 1) * 15;
  const { data: pokemons } = useQuery({
    queryKey: ["pokemons", page],
    enabled: editedStatus === "success" && searchedValue === "",
    queryFn: () => fetchData(actualPage, editedList),
    staleTime: 10 * (60 * 1000),
  });
  const { data: pokemonsToFilter } = useQuery({
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
        queryFn: () => fetchPokemonData(url),
        staleTime: 10 * (60 * 1000),
      };
    }),
  });
  return (
    <div>
      <Searcher handleSearcherChange={(e) => setSearchedValue(e.target.value)} />
      {pokemonQueries.length > 0 && (
        <>
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
