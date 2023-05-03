import useLogic from "src/Pages/useMainPage";
import { pokelogo } from "src/images";
import NavigationWrapper from "src/Navigation/NavigationWrapper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import styled from "styled-components";

const NavigationContainer = styled.div`
  padding: 50px 40px 70px 40px;
`;

const Navigation = () => {
  const { data } = useLogic();

  return (
    <>
      <NavigationContainer>
        <NavigationWrapper src={pokelogo} alt={`Logo`}>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined">ULUBIONE</Button>
            <Button variant="outlined">ARENA</Button>
            <Button variant="outlined">LOGOWANIE</Button>
            <Button variant="outlined">REJESTRACJA</Button>
            <Button variant="outlined">EDYCJA</Button>
            <Button variant="outlined">WYLOGUJ</Button>
          </Stack>
        </NavigationWrapper>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
