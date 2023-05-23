import React, { useContext } from "react";
import styled from "styled-components";
import GlobalContext from "src/context/GlobalContext";
const MyInput = styled.input`
  height: 40px;
  width: 45%;
  background: url(${(prop) => prop.theme.bgColor});
  color: ${(prop) => prop.theme.textColor};
`;
const StyledFormField = (props) => {
  const { theme } = useContext(GlobalContext);
  return <MyInput theme={theme} {...props} />;
};

export default StyledFormField;
