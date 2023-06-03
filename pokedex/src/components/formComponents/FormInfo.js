import React from "react";

import styled from "styled-components";

const MyFormInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;
const FormInfo = ({ value }) => {
  return <MyFormInfo>{value}</MyFormInfo>;
};

export default FormInfo;
