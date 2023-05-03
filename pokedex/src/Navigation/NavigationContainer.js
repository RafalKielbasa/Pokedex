import React from "react";
import styled from "styled-components";
import { Pokedex } from "../img";
import { Link } from "react-router-dom";
const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

const NavigationContainer = ({ children }) => {
  return (
    <NavWrapper>
      <Link to="/">
        <img src={Pokedex} alt="POKEDEX" width={"300px"} height={"100px"} />
      </Link>
      <div>{children}</div>
    </NavWrapper>
  );
};
export default NavigationContainer;
