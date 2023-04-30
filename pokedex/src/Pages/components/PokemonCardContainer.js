import React from "react";
import styled from "styled-components";
const MyCardContaner = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PokemonCardContainer = ({ children }) => {
  return <MyCardContaner>{children}</MyCardContaner>;
};

export default PokemonCardContainer;
