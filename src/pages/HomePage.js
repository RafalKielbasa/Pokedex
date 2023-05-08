import { useGetAllPokemonQuery } from "../hooks/useGetAllPokemon";
import { DefaultLayout } from "../components/layouts/Default/DefaultLayout";
import { HomePageWrapper } from "../components/wrappers/HomePageWrapper/HomePageWrapper";

export const HomePage = () => {
  useGetAllPokemonQuery();

  return (
    <DefaultLayout>
      <HomePageWrapper />
    </DefaultLayout>
  );
};
