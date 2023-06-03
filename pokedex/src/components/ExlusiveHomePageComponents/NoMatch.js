import React, { useContext } from "react";

import styled from "styled-components";

import GlobalContext from "src/context/GlobalContext";

const Container = styled.h1`
  color: ${(prop) => prop.theme.textColor};
`;

const NoMatch = ({ value }) => {
  const { theme } = useContext(GlobalContext);

  return <Container theme={theme}>{value}</Container>;
};

export default NoMatch;
