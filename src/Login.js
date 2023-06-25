import { useForm } from "react-hook-form";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Mail from "@mui/icons-material/Mail";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Button } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
  width: 600px;
  gap: 20px;
  border: 1px solid black;
  border-radius: 6px;
  padding: 2rem;
  margin-top: 30px;
`;

const Body = styled.body`
  min-height: 100vh;
  background-color: ${({ swich }) => (swich ? "#394867" : "#d4f1f4")};
`;

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { userInfo, setUserInfo, swich } = useContext(GlobalContext);
  const nav = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === data.email && user.password === data.password) {
      setUserInfo(data);
      console.log("Login success", userInfo);
      enqueueSnackbar("Login success", { variant: "success" });

      nav("/");
    } else {
      enqueueSnackbar("Login failed", { variant: "error" });
      console.log("Login failed");
    }
  };

  return (
    <Body swich={swich}>
      <Wrapper>
        <FormWraper onSubmit={handleSubmit(handleLogin)}>
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

          <Button variant="contained" type="submit">
            Login
          </Button>
          <Link style={{ color: "#1976D2" }} to="/register">
            Don't have account ? Register Now
          </Link>
        </FormWraper>
      </Wrapper>
    </Body>
  );
};

export default Login;
