import React from "react";
import { useEffect, useState, useContext } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { postUsersData } from "src/api/postData";
import { AppContext } from "src/context/AppContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

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

const Registration = () => {
  const [name, setName] = useState(``);
  const [email, setEmail] = useState(``);
  const [pass, setPass] = useState(``);
  const [repPass, setRepPass] = useState(``);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };

  const { theme, toggleTheme, isDark } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`name`, name);
    console.log(`email`, email);
    console.log(`pass`, pass);
    console.log(`repPass`, repPass);
    if (pass === repPass) {
      postUsersData("users", name, email, pass);
      enqueueSnackbar(`Użutkownik ${name} został zarejestrowany`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    } else {
      enqueueSnackbar(`Podane hasła nie są zgodne`, {
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    }
  };

  return (
    <>
      <ThemeProvider theme={theme2}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            placeholder="Full Name"
            id="name"
            name="name"
          />
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
          <label htmlFor="repPassword">repeat password</label>
          <input
            value={repPass}
            onChange={(e) => setRepPass(e.target.value)}
            type="password"
            placeholder="**********"
            id="repPassword"
            name="repPassword"
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
            Masz już konto ? Zaloguj się tu.
          </Button>
        </Stack>
      </ThemeProvider>
    </>
  );
};
export default Registration;
