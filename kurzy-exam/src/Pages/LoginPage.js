import React from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/context/AppContext";
import { Button, Input } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { ThemeProvider } from "@mui/material/styles";

const SiteWrapper = styled("div")(
  ({ theme }) =>
    css`
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 50px;
      height: 100vh;
      background-color: ${theme.bgColor};
    `
);
const FormWrapper = styled(Form)(
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    border: 1px solid;
    border-radius: 10px;
    padding: 50px;
    width: 313px;
  `
);

const Login = () => {
  const [usersData, setUsersData] = useState([]);

  const {
    theme,
    theme2,
    toggleLoggedIn,
    isLoggedIn,
    isDark,
    handleActiveButton,
  } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/registration");
    handleActiveButton("Rejestracja");
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
      }
    } else {
      enqueueSnackbar(`Niepoprawny e-mail`, {
        variant: "error",
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    }
  };

  isLoggedIn == "true" && (navigate("/edition"), handleActiveButton("Edycja"));

  return (
    <SiteWrapper theme={theme}>
      <ThemeProvider theme={theme2}>
        <Formik
          initialValues={{ logEmail: "", logPass: "" }}
          onSubmit={handleOnSubmit}
        >
          {({ values, handleChange, handleSubmit }) => {
            return (
              <FormWrapper
                style={{ color: `${isDark ? "white" : "black"}` }}
                onSubmit={handleSubmit}
              >
                <h2 style={{ color: `${isDark ? "white" : "black"}` }}>
                  Logowanie
                </h2>
                <Input
                  name="logEmail"
                  value={values.email}
                  placeholder="E-mail"
                  type="email"
                  style={{ color: `${isDark ? "white" : "black"}` }}
                  onChange={handleChange}
                />
                <ErrorMessage name="logEmail" />
                <Input
                  name="logPass"
                  value={values.pass}
                  placeholder="Hasło"
                  type="password"
                  className="password"
                  style={{ color: `${isDark ? "white" : "black"}` }}
                  onChange={handleChange}
                />
                <ErrorMessage name="logPass" />

                <Button
                  style={{ marginTop: "25px" }}
                  variant="outlined"
                  type="submit"
                  color={isDark ? "secondary" : "primary"}
                >
                  Zaloguj się
                </Button>
                <Button
                  style={{
                    marginTop: "25px",
                    background: "none",
                    textDecoration: "underline",
                  }}
                  color={isDark ? "secondary" : "primary"}
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
