import React from "react";
import styled from "styled-components";
const MyDetailedCardContaner = styled.div`
  display: flex;
  height: 450px;
  justify-content: center;
  align-items: center;
  margin-bottom 30px;
`;

const DetailedPokemonCardConatiner = ({ children }) => {
  return <MyDetailedCardContaner>{children}</MyDetailedCardContaner>;
};

export default DetailedPokemonCardConatiner;
