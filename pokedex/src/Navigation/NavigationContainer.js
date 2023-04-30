import React from "react";
import styled from "styled-components";
import { Pokedex } from "../img";
const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

const NavigationContainer = ({ children }) => {
  return (
    <NavWrapper>
      <img src={Pokedex} alt="POKEDEX" width={"300px"} height={"100px"} />
      <div>{children}</div>
    </NavWrapper>
  );
};
export default NavigationContainer;
