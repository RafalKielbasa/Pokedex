import styled from "styled-components";
import img from "../../../assets/arenaPvp.png";

export const Container = styled.div`
  background-image: url(${img});
  min-height: 95vh;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled.button`
  border-radius: 50%;
  align-self: center;
  background: initial;
  border: none;
  max-width: 20vw;
  &:hover {
    animation: rotation 2.5s infinite linear;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
