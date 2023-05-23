import React from "react";
import { useQueries } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchOnePokemon } from "src/api/fetchDataFunctions";
import {
  PokemonCard,
  PokemonCardContainer,
  BasicPokemonLayout,
} from "../components";
const FavoritesPage = () => {
  const { favoriteList, editedList } = useOutletContext();

  const favoritePokemons = useQueries({
    queries: favoriteList?.map((name) => {
      return {
        queryKey: ["pokemon", name],
        queryFn: () => fetchOnePokemon(editedList, name),
        enabled: favoriteList.length > 0,
        staleTime: 10 * (60 * 1000),
      };
    }),
  });
  console.log({ favoriteList, favoritePokemons });
  return (
    <BasicPokemonLayout>
      <PokemonCardContainer>
        {favoritePokemons &&
          favoritePokemons?.map(
            ({ data, status }) =>
              status === "success" && (
                <PokemonCard key={data?.id} id={data?.id} value={data} />
              )
          )}
      </PokemonCardContainer>
    </BasicPokemonLayout>
  );
};

export default FavoritesPage;
