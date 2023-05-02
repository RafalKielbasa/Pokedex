import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonGroup, IconButton } from "@mui/material";
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
      <Button onClick={navigate("/")}>
        <img src={PokedexLogo} height="60px" width="120px" />
      </Button>
      <ButtonGroup variant="text">
        <Button>Ulubione</Button>
        <Button>Arena</Button>
        {!loginState && <Button>Logowanie</Button>}
        {!loginState && <Button>Rejestracja</Button>}
        {loginState && <Button>Edycja</Button>}
        {loginState && <Button>Wyloguj</Button>}
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
