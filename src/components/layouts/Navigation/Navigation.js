import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import pokedexLogo from "../../../assets/pokedexLogo.png";
import { Container } from "./Navigation.styles";

const navigationButtons = [
  {
    label: "Favorite",
    href: "/favorite",
  },
  {
    label: "PvP",
    href: "/pvp",
  },
  {
    label: "Sign in",
    href: "/signIn",
  },
  {
    label: "Sign up",
    href: "/signUp",
  },
  {
    label: "Edit and log out",
    href: "/editAndLogOut",
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
