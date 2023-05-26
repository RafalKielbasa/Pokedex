import React, { useContext } from "react";
import Switch from "@mui/material/Switch";
import styled from "styled-components";
import GlobalContext from "src/context/GlobalContext";
const ThemeName = styled.span`
  color: ${(prop) => prop.theme.textColor};
  font-size: 18px;
  font-weight: bold;
  @media (max-width: 992px) {
    font-size: 13px;
    font-weight: bold;
  }
`;
const ThemeConatiner = styled.span`
  border: 2px solid ${(prop) => prop.theme.textColor};
  background: ${(prop) => prop.theme.navButtonsColor};
  padding: 5px;
  border-radius: 25px;
  max-width: 320px;
`;
const MySwitch = ({ onClickAction, title, checkedValue }) => {
  const { theme } = useContext(GlobalContext);
  return (
    <ThemeConatiner theme={theme}>
      <ThemeName theme={theme}>{title}</ThemeName>
      <Switch onClick={onClickAction} checked={checkedValue} />
    </ThemeConatiner>
  );
};

export default MySwitch;
