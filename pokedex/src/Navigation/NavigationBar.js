import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "src/context/GlobalContext";
import styled from "styled-components";
const NavBarRow = styled.div`
  display: flex;
  gap: 20px;
  font-size: 24px;
`;
const NavigationBar = () => {
  const { setLoggedIn } = useContext(GlobalContext);
  return (
    <NavBarRow>
      <Link to="favourites"> Ulubione</Link>
      <Link to="arena"> Arena</Link>
      <Link to="logIn"> Logowanie</Link>
      <Link to="register"> Rejestracja</Link>
      <Link to="edit"> Edytowanie - tylko dla zalogowanych</Link>
      <Link to="/">
        <button onClick={() => setLoggedIn(false)}>Wyloguj</button>
      </Link>
    </NavBarRow>
  );
};
export default NavigationBar;
