import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const NavBarRow = styled.div`
  display: flex;
  gap: 20px;
  font-size: 24px;
`;
const NavigationBar = () => {
  return (
    <NavBarRow>
      <Link to="favourites"> Ulubione</Link>
      <Link to="arena"> Arena</Link>
      <Link to="logIn"> Logowanie</Link>
      <Link to="register"> Rejestracja</Link>
      <Link to="edit"> Edytowanie - tylko dla zalogowanych</Link>
      <Link to="/"> Wyloguj - tylko dla zalogowanych</Link>
      <Link to="/1"> Test</Link>
    </NavBarRow>
  );
};
export default NavigationBar;
