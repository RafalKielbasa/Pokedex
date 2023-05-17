import React from "react";
import { useContext } from "react";
import { LoginContext } from "./LoginContext";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserPanel = () => {
  const { userData } = useContext(LoginContext);

  return (
    <Wrapper>
      <Info>
        <p> {`User: ${userData.name}`}</p>
        <p> {`E-mail: ${userData.email}`}</p>
        <p>{`Status: normal user`}</p>
      </Info>
    </Wrapper>
  );
};

export default UserPanel;
