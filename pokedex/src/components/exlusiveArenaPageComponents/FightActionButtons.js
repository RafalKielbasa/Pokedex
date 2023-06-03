import React, { useContext } from "react";

import styled from "styled-components";

import GlobalContext from "src/context/GlobalContext";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FightButton = styled.button`
   {
    padding: 25px 30px;
    background-color: ${(prop) => prop.theme.navButtonsColor};
    color: #050801;
    font-size: 24px;
  }
`;

const FightActionButtons = ({ fightResult, fightResultFnc, ClickHandle }) => {
  const { theme } = useContext(GlobalContext);

  return (
    <ButtonContainer>
      {fightResult === "" ? (
        <FightButton theme={theme} onClick={fightResultFnc}>
          WALKA
        </FightButton>
      ) : (
        <FightButton theme={theme} onClick={ClickHandle}>
          Opuść Arenę
        </FightButton>
      )}
    </ButtonContainer>
  );
};

export default FightActionButtons;
