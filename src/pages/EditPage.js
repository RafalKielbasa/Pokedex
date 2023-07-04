import { useSearchParams } from 'react-router-dom';
import { DefaultLayout } from '../components/layouts/Default/DefaultLayout';
import { EditWrapper } from '../components/wrappers/EditWrapper/EditWrapper';
import { useAllPokemonQuery } from '../hooks/useAllPokemon';

export const EditPage = () => {
  const { data: allPokemon } = useAllPokemonQuery();
  const [searchParams] = useSearchParams();

  const correctPokemon = allPokemon?.find(
    (pokemon) => pokemon.name === searchParams.get('name')
  );
  return (
    <DefaultLayout>
      <EditWrapper pokemon={correctPokemon} length={allPokemon?.length} />
    </DefaultLayout>
  );
};
