import React from "react";
import styled from "styled-components";
const MyCardContaner = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
  margin-top: 30px;
`;

const PokemonCardContainer = ({ children }) => {
  return <MyCardContaner>{children}</MyCardContaner>;
};

export default PokemonCardContainer;
