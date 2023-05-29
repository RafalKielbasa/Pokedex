import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import pokedexLogo from "../../../assets/pokedexLogo.png";
import { Container } from "./Navigation.styles";
import { useContext } from "react";
import {
  NavigationButtonsLogout,
  NavigationButtonsLogin,
} from "../../../context/NavigationButtons";
import { ButtonContext } from "../../../context/NavigationContext";
import { v4 } from "uuid";

export const Navigation = () => {
  const user = useContext(ButtonContext);

  return (
    <Container>
      <img src={pokedexLogo} alt="pokedex logo" style={{ width: 200 }} />
      <h5>{user ? `Logged as: ${user.name}` : null}</h5>
      <Stack direction="row" spacing={2}>
        {user
          ? NavigationButtonsLogin.map((button) => {
              return (
                <Button href={button.href} key={v4()}>
                  {button.label}
                </Button>
              );
            })
          : NavigationButtonsLogout.map((button) => {
              return (
                <Button href={button.href} key={v4()}>
                  {button.label}
                </Button>
              );
            })}
      </Stack>
    </Container>
  );
};
