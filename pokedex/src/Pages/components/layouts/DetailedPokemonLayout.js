import React, { useContext } from "react";
import GlobalContext from "src/context/GlobalContext";
import styled from "styled-components";

const MyDetailedPokemonLayout = styled.div`
  background: ${(prop) => prop.theme.bgColor};
  height: 100vh;
`;

const DetailedPokemonLayout = ({ children }) => {
  const { theme } = useContext(GlobalContext);
  return <MyDetailedPokemonLayout theme={theme}>{children}</MyDetailedPokemonLayout>;
};

export default DetailedPokemonLayout;
