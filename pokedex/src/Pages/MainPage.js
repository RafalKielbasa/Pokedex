import React from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchData, fetchPokemonData } from "src/api";
import { PokemonCard, PokemonCardContainer } from "./components";
const MainPage = () => {
  const query = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => fetchData(),
  });
  const { data: pokemons, isSuccess } = query;
  const resultList = isSuccess ? pokemons?.data?.results : [];
  const pokemonQueries = useQueries({
    queries: resultList?.map((pokemon) => {
      return {
        queryKey: ["pokemon", pokemon.name],
        queryFn: () => fetchPokemonData(pokemon.url),
      };
    }),
  });
  // const PokemonData = pokemonQueries?.map((value) => value.data);
  // useEffect(() => {
  //   pokemon && postData(pokemon);
  //   console.log("poszedł post");
  // }, [pokemon]);
  if (isSuccess) console.log(pokemonQueries[0]);
  return (
    <>
      <PokemonCardContainer>
        {pokemonQueries?.map(
          (value) =>
            value?.status === "success" && (
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
            )
        )}
      </PokemonCardContainer>
    </>
  );
};

export default MainPage;
