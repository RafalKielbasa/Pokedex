import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "@mui/material";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email(),
  password: yup
    .string()
    .required()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, `Password must contain at least one uppercase letter`)
    .matches(
      /[^a-zA-Z0-9]/,
      `Password must contain at least one special characters`
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], `Passwords must match`),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { userData } = useContext(LoginContext);
  const nav = useNavigate();

  const handleRegistration = (data) => {
    const { confirmPassword, ...user } = data;
    localStorage.setItem("user", JSON.stringify(user));
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
            {errors.name && <p>{errors.name.message}</p>}
            <Input type="email" placeholder="Email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}

            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <Input
              type="password"
              placeholder="confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

            <Button type="submit">Register</Button>
            <Link to="/login">Already have an account? Log in.</Link>
          </FormWraper>
        </Wrapper>
      )}
    </>
  );
};

export default Register;
