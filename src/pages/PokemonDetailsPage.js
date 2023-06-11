import { useSearchParams } from 'react-router-dom';
import { DefaultLayout } from '../components/layouts/Default/DefaultLayout';
import { PokemonDetailsWrapper } from '../components/wrappers/PokemonDetailsWrapper/PokemonDetailsWrapper';
import { useCorrectPokemonQuery } from '../hooks/useCorrecrtPokemon';

export const PokemonDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const { data: pokemon } = useCorrectPokemonQuery(searchParams.get('name'));

  return (
    <DefaultLayout>
      <PokemonDetailsWrapper pokemonData={pokemon?.data} />
    </DefaultLayout>
  );
};
