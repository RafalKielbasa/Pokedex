import React from "react";
import { useContext } from "react";
import { LoginContext } from "./LoginContext";
import styled from "styled-components";
import { ThemeContext } from "./ThemeContext";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Body = styled.body`
  min-height: 100vh;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserPanel = () => {
  const { userData } = useContext(LoginContext);
  const { theme } = useContext(ThemeContext);

  return (
    <Body
      style={{
        backgroundColor: theme ? "#720e9e" : "papayawhip",
      }}
    >
      <Wrapper>
        {userData ? (
          <Info>
            <p> {`User: ${userData.name}`}</p>
            <p> {`E-mail: ${userData.email}`}</p>
          </Info>
        ) : (
          <p>Please log in.</p>
        )}
      </Wrapper>
    </Body>
  );
};

export default UserPanel;
