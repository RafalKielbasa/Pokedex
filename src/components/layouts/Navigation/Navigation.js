import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import pokedexLogo from "../../../assets/pokedexLogo.png";
import { Container } from "./Navigation.styles";
import { useContext } from "react";
import {
  NavigationButtonsLogout,
  NavigationButtonsLogin,
} from "../../../context/NavigationButtons";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { ProjectUrl } from "../../../const/ProjectUrl";
import { UserContext } from "../../../context/UserContext";

export const Navigation = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const logout = (button) => {
    if (button === "SIGN OUT") {
      localStorage.removeItem("Pokedex-user");
      navigate(ProjectUrl.Home);
    }
  };

  return (
    <Container>
      <a href={ProjectUrl.Home}>
        <img src={pokedexLogo} alt="pokedex logo" style={{ width: 200 }} />
      </a>
      <h5>{user ? `Logged as: ${user.name}` : null}</h5>
      <Stack direction="row" spacing={2}>
        {user
          ? NavigationButtonsLogin.map((button) => {
              return (
                <Button
                  href={button.href}
                  key={v4()}
                  onClick={(btn) => logout(btn.target.innerText)}
                >
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
