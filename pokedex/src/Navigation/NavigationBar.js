import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "src/context/GlobalContext";
import styled from "styled-components";
const NavButton = styled.button`
   {
    padding: 25px 30px;
    background-color: ${(prop) => prop.theme.navButtonsColor};
    color: #050801;
    font-weight: bold;
    border: none;
    border-radius: 50px;
    letter-spacing: 4px;
    overflow: hidden;
    transition: 0.5s;
    font-size: 24px;
    @media (max-width: 992px) {
      width: 300px;
    }
  }
  :hover {
    background: ${(prop) => prop.theme.hoverButtonColor};
    color: white;
  }
`;
const ActiveNavButton = styled(NavButton)`
  background: ${(prop) => prop.theme.hoverButtonColor};
  color: white;
`;
const NavigationBar = () => {
  const { loggedIn, setLoggedIn, setUser, theme, activeBtn, ActiveBtnHandle } =
    useContext(GlobalContext);
  return (
    <>
      <Link to="/">
        {activeBtn === "Home" ? (
          <ActiveNavButton onClick={(e) => ActiveBtnHandle(e.target.innerHTML)} theme={theme}>
            Home
          </ActiveNavButton>
        ) : (
          <NavButton onClick={(e) => ActiveBtnHandle(e.target.innerHTML)} theme={theme}>
            Home
          </NavButton>
        )}
      </Link>
      <Link to="favourites">
        {activeBtn === "Ulubione" ? (
          <ActiveNavButton onClick={(e) => ActiveBtnHandle(e.target.innerHTML)} theme={theme}>
            Ulubione
          </ActiveNavButton>
        ) : (
          <NavButton onClick={(e) => ActiveBtnHandle(e.target.innerHTML)} theme={theme}>
            Ulubione
          </NavButton>
        )}
      </Link>
      <Link to="arena">
        {activeBtn === "Arena" ? (
          <ActiveNavButton onClick={(e) => ActiveBtnHandle(e.target.innerHTML)} theme={theme}>
            Arena
          </ActiveNavButton>
        ) : (
          <NavButton onClick={(e) => ActiveBtnHandle(e.target.innerHTML)} theme={theme}>
            Arena
          </NavButton>
        )}
      </Link>
      {!loggedIn && (
        <Link Link to="logIn">
          {activeBtn === "Logowanie" ? (
            <ActiveNavButton onClick={(e) => ActiveBtnHandle(e.target.innerHTML)} theme={theme}>
              Logowanie
            </ActiveNavButton>
          ) : (
            <NavButton onClick={(e) => ActiveBtnHandle(e.target.innerHTML)} theme={theme}>
              Logowanie
            </NavButton>
          )}
        </Link>
      )}
      {!loggedIn && (
        <Link to="register">
          {activeBtn === "Rejestracja" ? (
            <ActiveNavButton onClick={(e) => ActiveBtnHandle(e.target.innerHTML)} theme={theme}>
              Rejestracja
            </ActiveNavButton>
          ) : (
            <NavButton onClick={(e) => ActiveBtnHandle(e.target.innerHTML)} theme={theme}>
              Rejestracja
            </NavButton>
          )}
        </Link>
      )}
      {loggedIn && (
        <Link to="edit">
          {activeBtn === "Edytowanie" ? (
            <ActiveNavButton onClick={(e) => ActiveBtnHandle(e.target.innerHTML)} theme={theme}>
              Edytowanie
            </ActiveNavButton>
          ) : (
            <NavButton onClick={(e) => ActiveBtnHandle(e.target.innerHTML)} theme={theme}>
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
    </>
  );
};
export default NavigationBar;
