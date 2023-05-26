import React from "react";
import styled from "styled-components";
const MyFormHeader = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
const FormHeader = ({ value }) => {
  return <MyFormHeader>{value}</MyFormHeader>;
};

export default FormHeader;
