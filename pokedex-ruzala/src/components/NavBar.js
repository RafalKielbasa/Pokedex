import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonGroup } from "@mui/material";
import PokedexLogo from "../images/PokedexLogo.png";

export default function NavBar({ loginState }) {
  const navigate = useNavigate();
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
              navigate("/");
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
