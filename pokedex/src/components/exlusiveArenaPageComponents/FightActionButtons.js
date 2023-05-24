import React, { useContext } from "react";
import GlobalContext from "src/context/GlobalContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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
const FightActionButtons = ({
  fightResult,
  fightResultFnc,
  setFightResult,
}) => {
  const { theme, ActiveBtnHandle } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <ButtonContainer>
      {fightResult === "" ? (
        <FightButton theme={theme} onClick={() => fightResultFnc()}>
          WALKA
        </FightButton>
      ) : (
        <FightButton
          theme={theme}
          onClick={() => {
            navigate(`/`);
            ActiveBtnHandle("Home");
            setFightResult("");
          }}
        >
          Opuść Arenę
        </FightButton>
      )}
    </ButtonContainer>
  );
};

export default FightActionButtons;
