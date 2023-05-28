import React, { useContext } from "react";

import styled from "styled-components";

import GlobalContext from "src/context/GlobalContext";

const MyFormContainer = styled.div`
  min-height: 82.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${(prop) => prop.theme.bgColor});
  color: ${(prop) => prop.theme.textColor};
`;

const FormContainer = ({ children }) => {
  const { theme } = useContext(GlobalContext);

  return <MyFormContainer theme={theme}>{children}</MyFormContainer>;
};

export default FormContainer;
