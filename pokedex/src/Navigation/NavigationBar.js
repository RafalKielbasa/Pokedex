import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "src/context/GlobalContext";
import styled from "styled-components";
import ButtonGroup from "@mui/material/ButtonGroup";
const NavButton = styled.button`
   {
    padding: 25px 30px;
    background-color: #e6e6fa;
    color: #050801;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    letter-spacing: 4px;
    overflow: hidden;
    transition: 0.5s;
    cursor: pointer;
    font-size: 24px;
  }

  :hover {
    background: #7851a9;
    color: white;
    box-shadow: 0 0 5px #7851a9, 0 0 25px #7851a9, 0 0 50px #7851a9,
      0 0 200px #7851a9;
    -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
  }
`;
const NavigationBar = () => {
  const { loggedIn, setLoggedIn, setUser } = useContext(GlobalContext);
  return (
    <ButtonGroup variant="contained" sx={{ display: "flex", flexWrap: "wrap" }}>
      <Link to="favourites">
        <NavButton>Ulubione</NavButton>
      </Link>
      <Link to="arena">
        <NavButton>Arena</NavButton>
      </Link>
      <Link to="logIn">
        <NavButton>Logowanie</NavButton>
      </Link>
      <Link to="register">
        <NavButton>Rejestracja</NavButton>
      </Link>
      {loggedIn && (
        <Link to="edit">
          <NavButton>Edytowanie</NavButton>{" "}
        </Link>
      )}
      {loggedIn && (
        <Link to="/">
          <NavButton
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
