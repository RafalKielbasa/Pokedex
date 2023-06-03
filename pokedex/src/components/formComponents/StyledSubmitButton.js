import React, { useContext } from "react";

import styled from "styled-components";

import GlobalContext from "src/context/GlobalContext";

import FormRowContainer from "./FormRowContainer";

const StyledButton = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 45%;
  height: 12%;
  font-size: 24px;
  background-color: ${(prop) => prop.theme.navButtonsColor};
  color: ${(prop) => prop.theme.textColor};
  :disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`;

const StyledSubmitButton = ({ value, disableConditions, onClickActionsOtherThanSubmit }) => {
  const { theme } = useContext(GlobalContext);

  return (
    <FormRowContainer>
      <StyledButton
        theme={theme}
        type="submit"
        disabled={disableConditions}
        onClick={onClickActionsOtherThanSubmit}
      >
        {value}
      </StyledButton>
    </FormRowContainer>
  );
};

export default StyledSubmitButton;
