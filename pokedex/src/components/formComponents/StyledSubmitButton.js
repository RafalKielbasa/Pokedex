import React, { useContext } from "react";
import styled from "styled-components";
import FormRowContainer from "./FormRowContainer";
import GlobalContext from "src/context/GlobalContext";
const StyledButton = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 45%;
  height: 12%;
  font-size: 24px;
  background-color: ${(prop) => prop.theme.navButtonsColor};
  color: ${(prop) => prop.theme.textColor};
`;
const StyledSubmitButton = ({
  value,
  disableConditions,
  onClickActionsOtherThanSubmit,
}) => {
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
