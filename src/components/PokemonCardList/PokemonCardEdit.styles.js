import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1.5px solid black;
  border-radius: 10px;
  background-color: #f5f5f5;
  transition: 0.2s all ease-in;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Img = styled.img`
  height: 100px;
`;

export const Name = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 24px;
  font-size: 32px;
  font-weight: 900;
  text-transform: capitalize;
  margin: auto;
  a {
    color: inherit;
    text-decoration: none;
  }
`;
