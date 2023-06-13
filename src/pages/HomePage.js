import { DefaultLayout } from '../components/layouts/Default/DefaultLayout';
import { HomePageWrapper } from '../components/wrappers/HomePageWrapper/HomePageWrapper';
import { useAllPokemonQuery } from '../hooks/useAllPokemon';

export const HomePage = () => {
  const { data: allPokemon } = useAllPokemonQuery();

  return (
    <DefaultLayout>
      <HomePageWrapper pokemonData={allPokemon} />
    </DefaultLayout>
  );
};
