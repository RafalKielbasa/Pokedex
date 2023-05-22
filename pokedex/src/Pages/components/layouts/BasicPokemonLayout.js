import React, { useContext } from "react";
import GlobalContext from "src/context/GlobalContext";
import styled from "styled-components";

const MyBasicPokemonLayout = styled.div`
  background: ${(prop) => prop.theme.bgColor};
  padding: 20px;
`;

const BasicPokemonLayout = ({ children }) => {
  const { theme } = useContext(GlobalContext);
  return <MyBasicPokemonLayout theme={theme}>{children}</MyBasicPokemonLayout>;
};

export default BasicPokemonLayout;
