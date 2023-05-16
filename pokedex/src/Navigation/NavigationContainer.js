import React from "react";
import styled from "styled-components";
import { Pokedex } from "../img";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
const NavWrapper = styled.div`
  background: #e6e6fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;
const NavButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const NavigationContainer = ({ children }) => {
  return (
    <NavWrapper>
      <Link to="/">
        <img src={Pokedex} alt="POKEDEX" width={"300px"} height={"100px"} />
      </Link>
      <NavButtonWrapper>{children}</NavButtonWrapper>
      <span>
        <span>Dark Theme</span>
        <Switch>ZMIANA THEME</Switch>
      </span>
    </NavWrapper>
  );
};
export default NavigationContainer;
