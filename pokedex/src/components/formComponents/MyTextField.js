import React, { useContext } from "react";

import styled from "styled-components";

import { useField } from "formik";

import GlobalContext from "src/context/GlobalContext";

import FormRowContainer from "./FormRowContainer";

const MyInput = styled.input`
  height: 40px;
  width: 45%;
  background: url(${(prop) => prop.theme.bgColor});
  color: ${(prop) => prop.theme.textColor};
`;

const MyErrorParagraf = styled.p`
  color: red;
  font-size: 12px;
  margin: 3px;
`;

const MyLabel = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const MyTextField = ({ label, ...props }) => {
  const { theme } = useContext(GlobalContext);
  const [field, meta] = useField(props);

  return (
    <FormRowContainer>
      <MyLabel>{label}</MyLabel>
      <MyInput theme={theme} {...field} {...props} />
      {meta.touched && meta.error ? (
        <MyErrorParagraf className="error">{meta.error}</MyErrorParagraf>
      ) : null}
    </FormRowContainer>
  );
};

export default MyTextField;
