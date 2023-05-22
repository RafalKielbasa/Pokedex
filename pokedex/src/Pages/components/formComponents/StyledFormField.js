import React from "react";
import styled from "styled-components";
const MyInput = styled.input`
  height: 40px;
  width: 45%;
`;
const StyledFormField = (props) => {
  return <MyInput {...props} />;
};

export default StyledFormField;
