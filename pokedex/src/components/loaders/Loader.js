import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
const LoaderContainer = styled.div`
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
const Loader = () => {
  return (
    <LoaderContainer>
      <CircularProgress />
      <SignContainer>Proszę czekać</SignContainer>
    </LoaderContainer>
  );
};

export default Loader;
