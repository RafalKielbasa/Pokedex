import React, { useContext } from "react";

import styled from "styled-components";

import GlobalContext from "src/context/GlobalContext";

const MyBasicPokemonLayout = styled.div`
  background: url(${(prop) => prop.theme.bgColor});
  padding: 20px;
  min-height: 100vh;
`;

const BasicPokemonLayout = ({ children }) => {
  const { theme } = useContext(GlobalContext);

  return <MyBasicPokemonLayout theme={theme}>{children}</MyBasicPokemonLayout>;
};

export default BasicPokemonLayout;
