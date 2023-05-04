import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import pokedexLogo from '../../../assets/pokedexLogo.png';
import { Container } from './Navigation.styles';

const navigationButtons = [
  {
    label: 'Ulubione',
    href: '/ulubione',
  },
  {
    label: 'Arena',
    href: '/arena',
  },
  {
    label: 'Logowanie',
    href: '/logowanie',
  },
  {
    label: 'Rejestracja',
    href: '/rejestracja',
  },
  {
    label: 'Edycja i wyloguj',
    href: '/edycja-i-wyloguj',
  },
];

export const Navigation = () => {
  return (
    <Container>
      <img src={pokedexLogo} alt="pokedex logo" style={{ width: 200 }}></img>
      <Stack direction="row" spacing={2}>
        {navigationButtons.map((button) => {
          return <Button href={button.href}>{button.label}</Button>;
        })}
      </Stack>
    </Container>
  );
};
