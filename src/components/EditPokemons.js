import React, { useContext } from "react";
import { LoginContext } from "./LoginContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const StyledLink = styled(Link)`
  margin: 0 5px;
`;
const EditPokemons = () => {
  const { userData } = useContext(LoginContext);

  return (
    <>
      {userData ? (
        <div>EditPokemons</div>
      ) : (
        <Error>
          To see this page, you must <StyledLink to="/login">LOG IN</StyledLink>{" "}
          first{" "}
        </Error>
      )}
    </>
  );
};

export default EditPokemons;
