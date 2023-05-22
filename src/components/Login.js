import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
//import { Input, Button } from "@mui/material";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";
import Person from "@mui/icons-material/Person";
import Mail from "@mui/icons-material/Mail";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Input, Button, Icon } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
  const [showPassword, setShowPassword] = useState(false);

  const handle = (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.email === data.email && user.password === data.password) {
      setUserData(user);
      nav("/");
    } else {
      alert("Empty fields");
    }
  };

  return (
    <Wrapper>
      <FormWraper onSubmit={handleSubmit(handle)}>
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
        />
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
        />
        <Button type="submit">Login</Button>
        <Link to="/register">Don't have account ? Register Now</Link>
      </FormWraper>
    </Wrapper>
  );
};

export default Login;
