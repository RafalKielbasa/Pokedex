import { useEffect, useState } from "react";
import { DefaultLayout } from "../components/layouts/Default/DefaultLayout";
import { HomePageWrapper } from "../components/wrappers/HomePageWrapper/HomePageWrapper";
import {
  fetchAllPokemon,
  fetchEachPokemon,
  pokemonMapper,
  saveToDb,
} from "../services/api";

export const HomePage = () => {
  // useEffect(() => {
  //   fetchAllPokemon().then((res) => {
  //     res.data.results.map((pokemon) => {
  //       return fetchEachPokemon(pokemon.url).then((res) => {
  //         const pokemon = pokemonMapper(res);
  //         saveToDb(pokemon);
  //       });
  //     });
  //   });
  // }, []);

  return (
    <DefaultLayout>
      <HomePageWrapper />
    </DefaultLayout>
  );
};
