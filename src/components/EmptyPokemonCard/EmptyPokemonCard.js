import { useContext } from 'react';
import { Container, H1 } from './EmptyPokemonCard.style';
import { ThemeContext } from '../../context/ThemeContext';

export const EmptyPokemonCard = () => {
  const { currentTheme, changeTheme } = useContext(ThemeContext);

  return (
    <Container theme={currentTheme}>
      <H1 theme={currentTheme}>Empty pokemon card</H1>
    </Container>
  );
};
