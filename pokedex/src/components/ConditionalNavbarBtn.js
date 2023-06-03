import React from "react";

import styled from "styled-components";

const NavButton = styled.button`
   {
    padding: 25px 30px;
    background-color: ${(prop) => prop.theme.navButtonsColor};
    color: #050801;
    font-weight: bold;
    border: none;
    border-radius: 50px;
    letter-spacing: 4px;
    overflow: hidden;
    transition: 0.5s;
    font-size: 24px;
    @media (max-width: 992px) {
      width: 300px;
    }
  }
  :hover {
    background: ${(prop) => prop.theme.hoverButtonColor};
    color: white;
  }
`;

const ActiveNavButton = styled(NavButton)`
  background: ${(prop) => prop.theme.hoverButtonColor};
  color: white;
`;

const ConditionalNavbarBtn = ({ activeBtn, value, clickHandle, theme }) => {
  return (
    <>
      {activeBtn === value ? (
        <ActiveNavButton onClick={clickHandle} theme={theme}>
          {value}
        </ActiveNavButton>
      ) : (
        <NavButton onClick={clickHandle} theme={theme}>
          {value}
        </NavButton>
      )}
    </>
  );
};

export default ConditionalNavbarBtn;
