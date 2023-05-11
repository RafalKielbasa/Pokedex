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

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { setUserData } = useContext(LoginContext);
  const nav = useNavigate();

  const handle = (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.email === data.email && user.password === data.password) {
      setUserData(user);
      nav("/");
    } else {
      alert("blablabla");
    }
  };

  return (
    <Wrapper>
      <FormWraper onSubmit={handleSubmit(handle)}>
        <Input type="email" placeholder="email" {...register("email")} />
        <Input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <Button type="submit">Login</Button>
        <Link to="/register">Don't have account ? Register Now</Link>
      </FormWraper>
    </Wrapper>
  );
};

export default Login;
