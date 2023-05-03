import React, { useEffect, useState } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";

import { fetchData, fetchPokemonData, fetchDataToFilter } from "src/api";
import { MyPagination, PokemonCard, PokemonCardContainer, Searcher } from "./components";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [searchedValue, setSearchedValue] = useState("");
  const [CreateComponentData, setCreateComponentData] = useState(null);
  const { data: pokemons, isSuccess } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => fetchData((page - 1) * 15),
    enabled: searchedValue === "",
  });
  const { data: pokemonsToFilter } = useQuery({
    queryKey: ["pokemonsToFilter"],
    queryFn: () => fetchDataToFilter(),
    enabled: searchedValue !== "",
  });

  useEffect(() => {
    if (isSuccess) {
      setCreateComponentData(pokemons?.data?.results);
    }
  }, [isSuccess, pokemons]);
  useEffect(() => {
    if (pokemonsToFilter && searchedValue !== "") {
      const filteredData = pokemonsToFilter.data?.results?.filter(({ name }) =>
        name?.includes(searchedValue.toLowerCase())
      );
      setCreateComponentData(filteredData);
    }
  }, [searchedValue, pokemonsToFilter, CreateComponentData]);

  const resultList = CreateComponentData ? CreateComponentData : [];
  const pokemonQueries = useQueries({
    queries: resultList?.map((pokemon) => {
      return {
        queryKey: ["pokemon", pokemon.name],
        queryFn: () => fetchPokemonData(pokemon.url),
      };
    }),
  });
  return (
    <>
      <Searcher handleSearcherChange={(e) => setSearchedValue(e.target.value)} />
      <PokemonCardContainer>
        {pokemonQueries.length !== 0 ? (
          pokemonQueries?.map(
            (value) =>
              value?.status === "success" && (
                <Link
                  key={value?.data?.data?.id}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to="pokemon"
                >
                  <PokemonCard
                    key={value?.data?.data?.id}
                    id={value?.data?.data?.id}
                    url={value?.data?.data?.sprites?.front_default}
                    title={value?.data?.data?.name}
                    height={value?.data?.data?.height}
                    baseExperience={value?.data?.data?.base_experience}
                    weight={value?.data?.data?.weight}
                    ability={value?.data?.data?.abilities[0].ability.name}
                  />
                </Link>
              )
          )
        ) : (
          <h1> BRAK DOPASOWAŃ</h1>
        )}
      </PokemonCardContainer>
      {searchedValue === "" && (
        <MyPagination count={11} pageNumber={page} paginationHanldeClick={(e, p) => setPage(p)} />
      )}
    </>
  );
};

export default HomePage;
