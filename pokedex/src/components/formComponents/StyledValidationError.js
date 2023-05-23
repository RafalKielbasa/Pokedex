import React from "react";
import styled from "styled-components";
const MyErrorParagraf = styled.p`
  color: red;
  font-size: 12px;
  margin: 3px;
`;
const StyledValidationError = (props) => {
  return <MyErrorParagraf {...props} />;
};

export default StyledValidationError;
