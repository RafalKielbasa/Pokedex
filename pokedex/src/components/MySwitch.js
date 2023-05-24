import React, { useContext } from "react";
import Switch from "@mui/material/Switch";
import styled from "styled-components";
import GlobalContext from "src/context/GlobalContext";
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
const MySwitch = ({ onClickAction, title }) => {
  const { theme } = useContext(GlobalContext);
  return (
    <ThemeConatiner theme={theme}>
      <ThemeName theme={theme}>{title}</ThemeName>
      <Switch onClick={onClickAction} />
    </ThemeConatiner>
  );
};

export default MySwitch;
