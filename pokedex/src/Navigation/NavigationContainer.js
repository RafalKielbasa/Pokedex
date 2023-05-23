import React, { useContext } from "react";
import styled from "styled-components";
import { Pokedex } from "../img";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import GlobalContext from "src/context/GlobalContext";
const NavWrapper = styled.div`
  background: ${(prop) => prop.theme.navContainerColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  flex-wrap: wrap;
`;
const NavButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const ThemeName = styled.span`
  color: ${(prop) => prop.theme.textColor};
  font-size: 18px;
`;
const NavigationContainer = ({ children }) => {
  const { toggleDarkMode, theme } = useContext(GlobalContext);
  return (
    <NavWrapper theme={theme}>
      <Link to="/">
        <img src={Pokedex} alt="POKEDEX" width={"300px"} height={"100px"} />
      </Link>
      <NavButtonWrapper>{children}</NavButtonWrapper>
      <span>
        <ThemeName theme={theme}>Dark Theme</ThemeName>
        <Switch onClick={() => toggleDarkMode()} />
      </span>
    </NavWrapper>
  );
};
export default NavigationContainer;
