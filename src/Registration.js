import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Person from "@mui/icons-material/Person";
import Mail from "@mui/icons-material/Mail";
import { GlobalContext } from "./context/global";
import { useSnackbar } from "notistack";

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
  gap: 20px;
  border: 1px solid black;
  width: 600px;
  border-radius: 6px;
  padding: 2rem;
  margin-top: 30px;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Body = styled.body`
  background-color: ${({ swich }) => (swich ? "#394867" : "#d4f1f4")};
  min-height: 100vh;
`;

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 character"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-,]+$/,
      `Email is not valid`
    ),
  password: yup
    .string()
    .required("Password is required")
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

const Registration = () => {
  const { setUserInfo, userInfo, swich } = useContext(GlobalContext);
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegistration = (data) => {
    const { confirmPassword, ...user } = data;
    localStorage.setItem("user", JSON.stringify(user));
    nav("/login");
    console.log("registration", userInfo);
    enqueueSnackbar("Registration successful!", { variant: "success" });
  };

  return (
    <Body swich={swich}>
      <Wrapper>
        <FormWraper onSubmit={handleSubmit(handleRegistration)}>
          <TextField
            type="text"
            placeholder="Username"
            {...register("username")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Person />
                </InputAdornment>
              ),
            }}
            sx={{ width: "100%" }}
          />
          {errors.username && <p>{errors.username.message}</p>}
          <TextField
            type="email"
            placeholder="Email"
            {...register("email")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Mail />
                </InputAdornment>
              ),
            }}
            sx={{ width: "100%" }}
          />
          {errors.email && <p>{errors.email.message}</p>}

          <TextField
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: "100%" }}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <TextField
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: "100%" }}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

          <Button variant="contained" type="submit">
            Register
          </Button>
          <Link style={{ color: "#1976D2" }} to="/login">
            Already have an account? Log in.
          </Link>
        </FormWraper>
      </Wrapper>
    </Body>
  );
};

export default Registration;
