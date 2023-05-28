import React from "react";

import styled from "styled-components";

const ArenaCardContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ArenaCardContainer = ({ children }) => {
  return <ArenaCardContainerStyle>{children}</ArenaCardContainerStyle>;
};

export default ArenaCardContainer;
