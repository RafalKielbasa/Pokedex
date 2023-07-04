import { v4 } from 'uuid';
import { SortButton } from './RankingWrapper.styles';

export const SortButtons = ({
  pokemon,
  setSortedPokemon,
  setCurrentButton,
  currentButton,
}) => {
  const Buttons = ['Experience', 'Weight', 'Winnings'];

  const handleSort = (button) => {
    let sortedPokemon = [];

    if (button === currentButton) {
      setCurrentButton();
    } else {
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
    }

    setSortedPokemon(sortedPokemon);
  };

  return Buttons?.map((btn) => {
    const isActive = btn === currentButton;

    return (
      <SortButton onClick={() => handleSort(btn)} key={v4()} active={isActive}>
        {btn}
      </SortButton>
    );
  });
};
