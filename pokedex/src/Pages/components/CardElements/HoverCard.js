import React from "react";
import styled from "styled-components";
const MyHover = styled.span`
  :hover {
    transform: translate3D(0, -1px, 0) scale(1.03);
  }
`;
const HoverCard = ({ children }) => {
  return <MyHover>{children}</MyHover>;
};

export default HoverCard;
