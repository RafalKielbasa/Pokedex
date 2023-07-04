import { PokemonWrapper } from '../HomePageWrapper/HomePageWrapper.styles';
import { PageWrapper } from '../PokemonDetailsWrapper/PokemonDetailsWrapper.style';
import { useAllFavoritesPokemonDataQuery } from '../../../hooks/useAllFavoritesPokemonData';
import { PokemonCard } from '../../PokemonCard/PokemonCard';
import { H1 } from './Favorite.style';
import { v4 } from 'uuid';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';

export const Favorite = () => {
  const { data: favoritesPokemonData } = useAllFavoritesPokemonDataQuery();
  const { currentTheme, changeTheme } = useContext(ThemeContext);

  if (favoritesPokemonData?.length === 0) {
    return <H1 theme={currentTheme}>There's nothing here yet</H1>;
  } else {
    return (
      <PageWrapper>
        <PokemonWrapper>
          {favoritesPokemonData?.map((pokemon) => {
            return <PokemonCard key={v4()} props={pokemon} />;
          })}
        </PokemonWrapper>
      </PageWrapper>
    );
  }
};
