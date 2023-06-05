import { DefaultLayout } from "../components/layouts/Default/DefaultLayout";
import { HomePageWrapper } from "../components/wrappers/HomePageWrapper/HomePageWrapper";
import { useAllPokemonQuery } from "../hooks/useAllPokemon";

export const HomePage = () => {
  const { data } = useAllPokemonQuery();

  return (
    <DefaultLayout>
      <HomePageWrapper pokemonData={data?.data} />
    </DefaultLayout>
  );
};
