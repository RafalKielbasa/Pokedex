import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonGroup } from "@mui/material";
import PokedexLogo from "../images/PokedexLogo.png";
import { GlobalContext } from "../App";
import { useContext } from "react";

export default function NavBar() {
  const navigate = useNavigate();
  const { loginState, setLoginState, readyToDisplay } =
    useContext(GlobalContext);
  if (readyToDisplay) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "6%",
          width: "100%",
        }}
      >
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src={PokedexLogo}
            alt="pokedex-logo"
            height="100%"
            width="60px"
          />
        </Button>
        {!loginState && (
          <ButtonGroup>
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              Logowanie
            </Button>
            <Button
              onClick={() => {
                navigate("/register");
              }}
            >
              Rejestracja
            </Button>
          </ButtonGroup>
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
      </Box>
    );
  }
}
