import React from "react";
import styled from "styled-components";
const NavBarRow = styled.div`
  display: flex;
  gap: 20px;
  font-size: 24px;
`;
const NavigationBar = () => {
  return (
    <NavBarRow>
      <span> ARENA</span>
      <span> LOGOWANIE</span>
      <span> REJESTRACJA</span>
      <span> EDYCJA - Tylko dla zalogowanych</span>
      <span> WYLOGUJ - Tylko dla zalogowanych</span>
    </NavBarRow>
  );
};
export default NavigationBar;
