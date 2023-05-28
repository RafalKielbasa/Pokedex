import React, { useContext } from "react";

import styled from "styled-components";

import GlobalContext from "src/context/GlobalContext";

const MyDetailedCardContaner = styled.div`
background:${(prop) => prop.theme.bgColor};
display: flex;
justify-content: center;
align-items: center;
margin-bottom 30px;
`;

const DetailedPokemonCardConatiner = ({ children }) => {
  const { theme } = useContext(GlobalContext);
  return <MyDetailedCardContaner theme={theme}>{children}</MyDetailedCardContaner>;
};

export default DetailedPokemonCardConatiner;
