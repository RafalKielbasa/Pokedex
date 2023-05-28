import React, { useContext } from "react";

import styled from "styled-components";

import GlobalContext from "src/context/GlobalContext";

const Container = styled.h1`
  color: ${(prop) => prop.theme.textColor};
`;

const NoMatch = () => {
  const { theme } = useContext(GlobalContext);

  return <Container theme={theme}>BRAK DOPASOWAŃ</Container>;
};

export default NoMatch;
