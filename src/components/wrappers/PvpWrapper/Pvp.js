import { EmptyPokemonCard } from '../../EmptyPokemonCard/EmptyPokemonCard';
import {
  CardWrapper,
  Container,
  EndButton,
  FightButton,
  WinnerAnnouncement,
} from './Pvp.style';
import img from '../../../assets/startFight.png';
import { useAllPokemonQuery } from '../../../hooks/useAllPokemon';
import { PokemonCard } from '../../PokemonCard/PokemonCard';
import { v4 } from 'uuid';
import useLocalStorage from 'use-local-storage';
import fightSound from '../../../assets/battle.mp3';
import fightWin from '../../../assets/battle-win.mp3';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useFightResultMutation } from '../../../hooks/useFightResult';

export const Pvp = () => {
  const { data: allPokemon } = useAllPokemonQuery();
  const [fighter, setFighter] = useLocalStorage('fighter');
  const [isFight, setIsFight] = useState(false);
  const [afterFight, setAfterFight] = useState(false);
  const [result, setResult] = useState();
  const { mutate: setNewStats } = useFightResultMutation(setResult);

  const fighters = allPokemon?.filter((pokemon) =>
    fighter?.includes(pokemon.id)
  );

  const renderCards = () => {
    if (fighters?.length === 2) {
      return fighters?.map((pokemon) => (
        <PokemonCard color={'red'} props={pokemon} key={v4()} />
      ));
    } else if (fighters?.length === 1) {
      return (
        <>
          {fighters?.map((pokemon) => (
            <PokemonCard props={pokemon} key={v4()} />
          ))}
          <EmptyPokemonCard />
        </>
      );
    } else {
      return new Array(2)
        .fill(true)
        .map((_, index) => <EmptyPokemonCard key={index} />);
    }
  };

  const handleFight = () => {
    if (fighters?.length < 2) {
      return enqueueSnackbar('There have to be two fighting pokemons', {
        variant: 'info',
      });
    } else {
      setIsFight(true);
      const fightAudio = new Audio(fightSound);
      const winAudio = new Audio(fightWin);
      fightAudio.volume = 0.04;
      winAudio.volume = 0.04;

      fightAudio.play();
      setTimeout(() => {
        fightAudio.pause();
        winAudio.play();
        setTimeout(() => {
          winAudio.pause();
        }, 6000);
        setNewStats(fighters);
        setAfterFight(true);
      }, 15000);
    }
  };

  return (
    <Container>
      {afterFight ? (
        <WinnerAnnouncement>
          {result}
          <EndButton onClick={() => setFighter()} variant="contained">
            QUIT
          </EndButton>
        </WinnerAnnouncement>
      ) : null}
      <FightButton onClick={() => handleFight()}>
        {isFight ? null : <img src={img} alt="Fight!" />}
      </FightButton>
      <CardWrapper>{renderCards()}</CardWrapper>
    </Container>
  );
};
