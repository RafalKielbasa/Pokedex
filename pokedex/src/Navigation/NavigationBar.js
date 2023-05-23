import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "src/context/GlobalContext";
import styled from "styled-components";
import ButtonGroup from "@mui/material/ButtonGroup";
const NavButton = styled.button`
   {
    padding: 25px 30px;
    background-color: ${(prop) => prop.theme.navButtonsColor};
    color: #050801;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    letter-spacing: 4px;
    overflow: hidden;
    transition: 0.5s;
    font-size: 24px;
  }
  :hover {
    background: ${(prop) => prop.theme.hoverButtonColor};
    color: white;
    box-shadow: 0 0 5px #3d85c6 0 0 25px #3d85c6, 0 0 50px #3d85c6, 0 0 200px #3d85c6;
    -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
  }
`;
const ActiveNavButton = styled(NavButton)`
  background: ${(prop) => prop.theme.hoverButtonColor};
  color: white;
  box-shadow: 0 0 5px #3d85c6 0 0 25px #3d85c6, 0 0 50px #3d85c6, 0 0 200px #3d85c6;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
`;
const NavigationBar = () => {
  const [activeBtn, setActiveBtn] = useState(null);
  const { loggedIn, setLoggedIn, setUser, theme } = useContext(GlobalContext);
  return (
    <ButtonGroup variant="contained" sx={{ display: "flex", flexWrap: "wrap" }}>
      <Link to="favourites">
        {activeBtn === "Ulubione" ? (
          <ActiveNavButton onClick={(e) => setActiveBtn(e.target.innerHTML)} theme={theme}>
            Ulubione
          </ActiveNavButton>
        ) : (
          <NavButton onClick={(e) => setActiveBtn(e.target.innerHTML)} theme={theme}>
            Ulubione
          </NavButton>
        )}
      </Link>
      <Link to="arena">
        {activeBtn === "Arena" ? (
          <ActiveNavButton onClick={(e) => setActiveBtn(e.target.innerHTML)} theme={theme}>
            Arena
          </ActiveNavButton>
        ) : (
          <NavButton onClick={(e) => setActiveBtn(e.target.innerHTML)} theme={theme}>
            Arena
          </NavButton>
        )}
      </Link>
      {!loggedIn && (
        <Link Link to="logIn">
          {activeBtn === "Logowanie" ? (
            <ActiveNavButton onClick={(e) => setActiveBtn(e.target.innerHTML)} theme={theme}>
              Logowanie
            </ActiveNavButton>
          ) : (
            <NavButton onClick={(e) => setActiveBtn(e.target.innerHTML)} theme={theme}>
              Logowanie
            </NavButton>
          )}
        </Link>
      )}
      {!loggedIn && (
        <Link to="register">
          {activeBtn === "Rejestracja" ? (
            <ActiveNavButton onClick={(e) => setActiveBtn(e.target.innerHTML)} theme={theme}>
              Rejestracja
            </ActiveNavButton>
          ) : (
            <NavButton onClick={(e) => setActiveBtn(e.target.innerHTML)} theme={theme}>
              Rejestracja
            </NavButton>
          )}
        </Link>
      )}
      {loggedIn && (
        <Link to="edit">
          {activeBtn === "Edytowanie" ? (
            <ActiveNavButton onClick={(e) => setActiveBtn(e.target.innerHTML)} theme={theme}>
              Edytowanie
            </ActiveNavButton>
          ) : (
            <NavButton onClick={(e) => setActiveBtn(e.target.innerHTML)} theme={theme}>
              Edytowanie
            </NavButton>
          )}
        </Link>
      )}
      {loggedIn && (
        <Link to="/">
          <NavButton
            theme={theme}
            onClick={() => {
              setLoggedIn(false);
              setUser(null);
            }}
          >
            Wyloguj
          </NavButton>
        </Link>
      )}
    </ButtonGroup>
  );
};
export default NavigationBar;
