import { Wrapper } from './EditAndLogoutWrapper.style';
import { PageWrapper } from '../HomePageWrapper/HomePageWrapper.styles';
import { PokemonCardEdit } from '../../PokemonCardList/PokemonCardEdit';
import { useAllPokemonQuery } from '../../../hooks/useAllPokemon';
import { v4 } from 'uuid';

export const EditAndLogoutWrapper = () => {
  const { data: allPokemons } = useAllPokemonQuery();

  return (
    <PageWrapper>
      <Wrapper>
        {allPokemons?.map((pokemon) => {
          return <PokemonCardEdit key={v4()} props={pokemon} />;
        })}
      </Wrapper>
    </PageWrapper>
  );
};
