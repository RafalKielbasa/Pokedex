import React from "react";

import styled from "styled-components";

const MyFormRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const FormRowContainer = ({ children }) => {
  return <MyFormRowContainer>{children}</MyFormRowContainer>;
};

export default FormRowContainer;
