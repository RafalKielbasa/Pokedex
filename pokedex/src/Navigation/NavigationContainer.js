import React from "react";
import styled from "styled-components";

const NavigationContainer = ({ children }) => {
  const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
  `;
  return <NavWrapper>{children}</NavWrapper>;
};
export default NavigationContainer;
