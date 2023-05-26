import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonGroup } from "@mui/material";
import PokedexLogo from "../images/PokedexLogo.png";
import { GlobalContext } from "../App";
import { useContext } from "react";

export default function NavBar() {
  const navigate = useNavigate();
  const { loginState, setLoginState } = useContext(GlobalContext);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={PokedexLogo} alt="pokedex-logo" height="60px" width="120px" />
      </Button>
      <ButtonGroup variant="text">
        <Button
          onClick={() => {
            navigate("/pokemons/");
          }}
        >
          Pokemony
        </Button>
        <Button
          onClick={() => {
            navigate("/favorites");
          }}
        >
          Ulubione
        </Button>
        <Button
          onClick={() => {
            navigate("/arena");
          }}
        >
          Arena
        </Button>
        {!loginState && (
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Logowanie
          </Button>
        )}
        {!loginState && (
          <Button
            onClick={() => {
              navigate("/register");
            }}
          >
            Rejestracja
          </Button>
        )}
        {loginState && (
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Edycja
          </Button>
        )}
        {loginState && (
          <Button
            onClick={() => {
              setLoginState(false);
              localStorage.removeItem("user");
            }}
          >
            Wyloguj
          </Button>
        )}
      </ButtonGroup>
      <Box
        sx={{
          backgroundColor: "primary.light",
          alignSelf: "flex-end",
          width: "100%",
          height: "3%",
        }}
      />
    </Box>
  );
}
