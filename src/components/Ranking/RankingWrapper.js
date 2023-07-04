import { v4 } from 'uuid';
import { useAllPokemonQuery } from '../../hooks/useAllPokemon';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { PokemonWrapper } from '../wrappers/HomePageWrapper/HomePageWrapper.styles';
import { SortButtons } from './RankingSortButtons';
import { useState } from 'react';
import { ButtonsWrapper } from './RankingWrapper.styles';

export const RankingWrapper = () => {
  const { data: allPokemon } = useAllPokemonQuery();
  const [sortedPokemon, setSortedPokemon] = useState([]);
  const [currentButton, setCurrentButton] = useState();

  return (
    <>
      <ButtonsWrapper>
        <SortButtons
          pokemon={allPokemon}
          setSortedPokemon={setSortedPokemon}
          setCurrentButton={setCurrentButton}
          currentButton={currentButton}
        />
      </ButtonsWrapper>
      <PokemonWrapper>
        {currentButton
          ? sortedPokemon?.map((pokemon) => (
              <PokemonCard
                props={pokemon}
                key={v4()}
                sortedPokemon={sortedPokemon}
                isSort={true}
              />
            ))
          : allPokemon?.map((pokemon) => (
              <PokemonCard props={pokemon} key={v4()} />
            ))}
      </PokemonWrapper>
    </>
  );
};
