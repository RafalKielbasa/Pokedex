import styled from "styled-components";

export const WrapperDiv = styled.div`
  display: flex;
  border: 1.5px solid black;
  flex-direction: column;
  width: 180px;
  border-radius: 5%;
  box-shadow: 0px 0px 20px -5px rgba(66, 68, 90, 1);
`;

export const Body = styled.div`
  padding: 12px;
`;

export const PropsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  text-align: center;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
