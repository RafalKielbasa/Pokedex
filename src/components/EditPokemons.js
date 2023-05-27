import React, { useContext } from "react";
import { LoginContext } from "./LoginContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Body = styled.body`
  min-height: 100vh;
`;
const StyledLink = styled(Link)`
  margin: 0 5px;
`;
const EditPokemons = () => {
  const { userData } = useContext(LoginContext);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Body
        style={{
          backgroundColor: theme ? "#720e9e" : "papayawhip",
        }}
      >
        {userData ? (
          <div></div>
        ) : (
          <Error>
            To see this page, you must{" "}
            <StyledLink to="/login">LOG IN</StyledLink> first{" "}
          </Error>
        )}
      </Body>
    </>
  );
};

export default EditPokemons;
