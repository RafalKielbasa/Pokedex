import { v4 } from 'uuid';
import { ButtonsWrapper } from './RankingWrapper.styles';
import { Button } from '@mui/material';

export const SortButtons = ({
  pokemon,
  setSortedPokemon,
  setCurrentButton,
}) => {
  const Buttons = ['Experience', 'Weight', 'Winnings'];

  const handleSort = (button) => {
    let sortedPokemon = [];

    switch (button) {
      case 'Weight':
        setCurrentButton(button);
        sortedPokemon = [...pokemon].sort(function (a, b) {
          return b.weight - a.weight;
        });
        break;
      case 'Experience':
        setCurrentButton(button);
        sortedPokemon = [...pokemon].sort(function (a, b) {
          return b.baseExperience - a.baseExperience;
        });
        break;
      case 'Winnings':
        setCurrentButton(button);
        sortedPokemon = [...pokemon].sort(function (a, b) {
          return b.win - a.win;
        });
        break;
      default:
        break;
    }

    setSortedPokemon(sortedPokemon);
  };

  return Buttons?.map((btn) => {
    return (
      <Button variant="outlined" onClick={() => handleSort(btn)} key={v4()}>
        {btn}
      </Button>
    );
  });
};
