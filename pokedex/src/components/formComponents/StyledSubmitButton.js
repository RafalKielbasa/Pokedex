import React from "react";
import styled from "styled-components";
import FormRowContainer from "./FormRowContainer";
const StyledButton = styled.button`
  margin-top: 30px;
  margin-bottom: 5px;
  width: 45%;
  height: 12%;
  font-size: 24px;
`;
const StyledSubmitButton = ({
  value,
  disableConditions,
  onClickActionsOtherThanSubmit,
}) => {
  return (
    <FormRowContainer>
      <StyledButton
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
