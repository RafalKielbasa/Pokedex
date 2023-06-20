import React from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/context/AppContext";
import { Button, Input } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const SiteWrapper = styled("div")(
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  `
);
const FormWrapper = styled(Form)(
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 50px;
    width: 313px;
  `
);

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
  const [usersData, setUsersData] = useState([]);
  // const [isSubmitted, setIsSubmitted] = useState(true);

  const { theme, toggleTheme, toggleLoggedIn, isDark } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/registration");
  };

  const getUsers = async () => {
    const response = await axios.get(`http://localhost:3001/users/`);
    const getUsersData = response?.data;
    setUsersData(getUsersData);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleOnSubmit = (values) => {
    getUsers();

    const userData = usersData.find((user) => user.email === values.logEmail);
    console.log(`userData`, userData.name);

    if (userData) {
      if (userData.pass !== values.logPass) {
        enqueueSnackbar(`Podane przez Ciebie hasło jest nieprawidłowe`, {
          variant: "error",
          preventDuplicate: true,
          autoHideDuration: 5000,
        });
      } else {
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("user", JSON.stringify(userData.name));
        toggleLoggedIn();

        enqueueSnackbar(
          `Użytkownik ${userData.name} został zalogowany do systemu`,
          {
            variant: "success",
            preventDuplicate: true,
            autoHideDuration: 5000,
          }
        );
        navigate("/edition");
      }
    } else {
      enqueueSnackbar(`Niepoprawny e-mail`, {
        variant: "error",
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    }
  };

  return (
    <SiteWrapper>
      <ThemeProvider theme={theme2}>
        <Formik
          initialValues={{ logEmail: "", logPass: "" }}
          onSubmit={handleOnSubmit}
          // validationSchema={userSchema}
        >
          {({ values, handleChange, handleSubmit }) => {
            return (
              <FormWrapper onSubmit={handleSubmit}>
                <h2>Logowanie</h2>
                <Input
                  name="logEmail"
                  value={values.email}
                  placeholder="E-mail"
                  type="email"
                  onChange={handleChange}
                />
                <ErrorMessage name="email" />
                <Input
                  name="logPass"
                  value={values.pass}
                  placeholder="Hasło"
                  type="password"
                  className="password"
                  onChange={handleChange}
                />
                <ErrorMessage name="pass" />

                <Button
                  style={{ marginTop: "25px" }}
                  variant="outlined"
                  type="submit"
                >
                  Zaloguj się
                </Button>
                <Button
                  style={{
                    marginTop: "25px",
                    background: "none",
                    textDecoration: "underline",
                  }}
                  onClick={handleClick}
                >
                  Nie masz konta ? Zarejestruj się tu
                </Button>
              </FormWrapper>
            );
          }}
        </Formik>
      </ThemeProvider>
    </SiteWrapper>
  );
};
export default Login;
