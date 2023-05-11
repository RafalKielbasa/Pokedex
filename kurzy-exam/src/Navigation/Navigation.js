import { pokelogo } from "src/Images";
import NavigationWrapper from "src/Navigation/NavigationWrapper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavigationContainer = styled.div`
  padding: 50px 40px 50px 40px;
`;

const Navigation = () => {
  return (
    <>
      <NavigationContainer>
        <NavigationWrapper src={pokelogo} alt={`Logo`}>
          <Stack direction="row" spacing={2}>
            <Link to="/">
              <Button variant="outlined">HOME</Button>
            </Link>
            <Link to="favorites">
              <Button variant="outlined">ULUBIONE</Button>
            </Link>
            <Link to="arena">
              <Button variant="outlined">ARENA</Button>
            </Link>
            <Link to="login">
              <Button variant="outlined">LOGOWANIE</Button>
            </Link>
            <Link to="registration">
              <Button variant="outlined">REJESTRACJA</Button>
            </Link>
            <Link to="edition">
              <Button variant="outlined">EDYCJA</Button>
            </Link>

            <Button variant="outlined">WYLOGUJ</Button>
          </Stack>
        </NavigationWrapper>
      </NavigationContainer>
    </>
  );
};
export default Navigation;
