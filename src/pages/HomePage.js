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
  const [allPokemon, setAllPokemon] = useState([]);
  console.log(allPokemon);

  useEffect(() => {
    fetchAllPokemon().then((res) => {
      res.data.results.map(async (pokemon) => {
        return await fetchEachPokemon(pokemon.url).then((res) => {
          const pokemon = pokemonMapper(res);
          setAllPokemon(pokemon);
          saveToDb(allPokemon);
        });
      });
    });
  }, [allPokemon]);

  return (
    <DefaultLayout>
      <HomePageWrapper />
    </DefaultLayout>
  );
};
