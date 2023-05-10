import React from "react";
import { useForm } from "react-hook-form";
import { Input, TextField, Button } from "@mui/material";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWraper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Register = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const nav = useNavigate();

  const handle = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    nav("/login");
  };
  return (
    <Wrapper>
      <FormWraper onSubmit={handleSubmit(handle)}>
        <Input type="text" placeholder="username" {...register("name")} />
        <Input type="email" placeholder="email" {...register("email")} />
        <Input
          type="password"
          placeholder="password"
          {...register("password")}
        />

        <Button type="submit">Register</Button>
        <Link to="/login">Do you have account ? Log in.</Link>
      </FormWraper>
    </Wrapper>
  );
};

export default Register;
