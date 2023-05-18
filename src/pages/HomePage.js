import { DefaultLayout } from "../components/layouts/Default/DefaultLayout";
import { HomePageWrapper } from "../components/wrappers/HomePageWrapper/HomePageWrapper";
import {
  fetchAllPokemon,
  fetchEachPokemon,
  pokemonMapper,
  saveToDb,
} from "../services/api";
import { useAllPokemonQuery } from "../hooks/useAllPokemon";

export const HomePage = () => {
  const { data } = useAllPokemonQuery();

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
      <HomePageWrapper pokemonData={data?.data} />
    </DefaultLayout>
  );
};
