import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "src/context/GlobalContext";
import styled from "styled-components";
import ButtonGroup from "@mui/material/ButtonGroup";
const NavButton = styled.button`
   {
    padding: 25px 30px;
    background-color: #9cc1e1;
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
    background: #3d85c6;
    color: white;
    box-shadow: 0 0 5px #3d85c6 0 0 25px #3d85c6, 0 0 50px #3d85c6, 0 0 200px #3d85c6;
    -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
  }
  :focus {
    background: #3d85c6;
    color: white;
    box-shadow: 0 0 5px #3d85c6, 0 0 25px #3d85c6, 0 0 50px #3d85c6, 0 0 200px #3d85c6;
    -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
  }
`;
const NavigationBar = () => {
  const { loggedIn, setLoggedIn, setUser } = useContext(GlobalContext);
  return (
    <ButtonGroup variant="contained" sx={{ display: "flex", flexWrap: "wrap" }}>
      <Link to="favourites">
        <NavButton className="active">Ulubione</NavButton>
      </Link>
      <Link to="arena">
        <NavButton>Arena</NavButton>
      </Link>
      {!loggedIn && (
        <Link Link to="logIn">
          <NavButton>Logowanie</NavButton>
        </Link>
      )}
      {!loggedIn && (
        <Link to="register">
          <NavButton>Rejestracja</NavButton>
        </Link>
      )}
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
