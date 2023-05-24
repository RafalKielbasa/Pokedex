import React, { useContext } from "react";
import styled from "styled-components";
import { Pokedex } from "../img";
import Switch from "@mui/material/Switch";
import GlobalContext from "src/context/GlobalContext";
import { Link } from "react-router-dom";

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
  font-weight: bold;
`;
const ThemeConatiner = styled.span`
  border: 2px solid ${(prop) => prop.theme.textColor};
  background: ${(prop) => prop.theme.navButtonsColor};
  padding: 5px;
  border-radius: 25px;
`;

const NavigationContainer = ({ children }) => {
  const { toggleDarkMode, theme, ActiveBtnHandle } = useContext(GlobalContext);
  return (
    <NavWrapper theme={theme}>
      <Link to="/">
        <img
          src={Pokedex}
          alt="POKEDEX"
          width={"300px"}
          height={"100px"}
          onClick={() => ActiveBtnHandle("Home")}
        />
      </Link>
      <NavButtonWrapper>{children}</NavButtonWrapper>
      <ThemeConatiner theme={theme}>
        <ThemeName theme={theme}>Dark Theme</ThemeName>
        <Switch onClick={() => toggleDarkMode()} />
      </ThemeConatiner>
    </NavWrapper>
  );
};
export default NavigationContainer;
