import React from "react";

import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignContainer = styled.div`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const ErrorMsg = ({ errorMsg }) => {
  return (
    <ErrorContainer>
      <SignContainer>{errorMsg}</SignContainer>
    </ErrorContainer>
  );
};

export default ErrorMsg;
