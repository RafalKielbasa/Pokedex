import React from "react";

import { useQueries } from "@tanstack/react-query";

import { useOutletContext } from "react-router-dom";

import { fetchOnePokemon } from "src/api/fetchDataFunctions";

import { PokemonCard } from "src/components/cards";
import { BasicPokemonLayout } from "src/components/layouts";
import { PokemonCardContainer } from "src/components/cardContainers";
import { NoMatch } from "src/components/exlusiveHomePageComponents";

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

  return (
    <BasicPokemonLayout>
      <PokemonCardContainer>
        {favoriteList.length > 0 ? (
          <>
            {favoritePokemons &&
              favoritePokemons?.map(
                ({ data, status }) =>
                  status === "success" && <PokemonCard key={data?.id} id={data?.id} value={data} />
              )}
          </>
        ) : (
          <NoMatch value={"BRAK ULUBIONYCH"} />
        )}
      </PokemonCardContainer>
    </BasicPokemonLayout>
  );
};

export default FavoritesPage;
