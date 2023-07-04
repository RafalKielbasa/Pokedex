import { useSearchParams } from 'react-router-dom';
import { DefaultLayout } from '../components/layouts/Default/DefaultLayout';
import { PokemonDetailsWrapper } from '../components/wrappers/PokemonDetailsWrapper/PokemonDetailsWrapper';
import { useAllPokemonQuery } from '../hooks/useAllPokemon';

export const PokemonDetailsPage = () => {
  const { data: allPokemon } = useAllPokemonQuery();
  const [searchParams] = useSearchParams();

  const correctPokemon = allPokemon?.find(
    (pokemon) => pokemon.name === searchParams.get('name')
  );

  return (
    <DefaultLayout>
      <PokemonDetailsWrapper pokemonData={correctPokemon} />
    </DefaultLayout>
  );
};
