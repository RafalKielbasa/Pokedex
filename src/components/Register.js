import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "@mui/material";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const FormWraper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid black;
  border-radius: 6px;
  padding: 2rem;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { userData } = useContext(LoginContext);
  const nav = useNavigate();

  const handleRegistration = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    nav("/login");
  };

  return (
    <>
      {userData ? (
        <Info>{`You are already logg ${userData.name}`}</Info>
      ) : (
        <Wrapper>
          <FormWraper onSubmit={handleSubmit(handleRegistration)}>
            <Input type="text" placeholder="Username" {...register("name")} />
            <Input type="email" placeholder="Email" {...register("email")} />
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />

            <Button type="submit">Register</Button>
            <Link to="/login">Already have an account? Log in.</Link>
          </FormWraper>
        </Wrapper>
      )}
    </>
  );
};

export default Register;
