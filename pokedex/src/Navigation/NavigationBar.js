import React from "react";
import styled from "styled-components";
const NavigationBar = () => {
  const NavBarCell = styled.div`
    display: flex;
    gap: 20px;
  `;
  return (
    <NavBarCell>
      <span> POKEDEX</span>
      <span> ULUBIONE</span>
      <span> ARENA</span>
      <span> LOGOWANIE</span>
      <span> REJESTRACJA</span>
      <span> EDYCJA - Tylko dla zalogowanych</span>
      <span> WYLOGUJ - Tylko dla zalogowanych</span>
    </NavBarCell>
  );
};
export default NavigationBar;
