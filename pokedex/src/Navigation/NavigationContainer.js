import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Pokedex } from "../img";

import GlobalContext from "src/context/GlobalContext";
import { Link } from "react-router-dom";
import { MySwitch } from "src/components";

const NavWrapper = styled.div`
  background: ${(prop) => prop.theme.navContainerColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  flex-wrap: wrap;
  gap: 20px;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
const NavButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const NavigationContainer = ({ children }) => {
  const { toggleDarkMode, theme, ActiveBtnHandle } = useContext(GlobalContext);
  const [checkedValue, setCheckedValue] = useState(false);
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
      <MySwitch
        title={"Dark Theme"}
        onClickAction={() => {
          toggleDarkMode();
          setCheckedValue((prev) => !prev);
        }}
        checkedValue={checkedValue}
      />
    </NavWrapper>
  );
};
export default NavigationContainer;
