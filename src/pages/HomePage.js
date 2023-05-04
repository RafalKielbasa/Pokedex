import { Navigation } from '../components/layouts/Navigation/Navigation';
import { useGetAllPokemonQuery } from '../hooks/useGetAllPokemon';

export const HomePage = () => {
  useGetAllPokemonQuery();

  return (
    <>
      <Navigation />
    </>
  );
};
