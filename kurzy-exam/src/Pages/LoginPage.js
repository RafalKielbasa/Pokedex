import React from "react";
import { useEffect, useState, useContext } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { AppContext } from "src/context/AppContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme2 = createTheme({
  palette: {
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const Login = () => {
  const [email, setEmail] = useState(``);
  const [pass, setPass] = useState(``);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/registration");
  };

  const { theme, toggleTheme, isDark } = useContext(AppContext);

  // console.log(`email`, email);
  // console.log(`pass`, pass);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`email`, email);
    console.log(`pass`, pass);
  };

  return (
    <>
      <ThemeProvider theme={theme2}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="podaj e-mail"
            id="email"
            name="email"
          />
          <label htmlFor="password">password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="**********"
            id="password"
            name="password"
          />

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "center",
              // gap: "800px",
              backgroundColor: isDark ? "#616161" : "white",
            }}
          >
            <Button
              type="submit"
              className="loginform"
              variant="outlined"
              color={isDark ? "secondary" : "primary"}
            >
              Log In
            </Button>
          </Stack>
        </form>
        <Stack>
          <Button onClick={handleClick}>
            Nie masz konta ? Zarejestruj się tu.
          </Button>
        </Stack>
      </ThemeProvider>
    </>
  );
};
export default Login;
