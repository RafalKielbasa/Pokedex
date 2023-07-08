import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MainLayout from "../layout/MainLayout";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const API_BASE_URL = "http://localhost:4100";

function Registration() {
  const navigateTo = useNavigate();
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme ? JSON.parse(savedTheme) : { mode: "light" };
  }

  const userSchema = Yup.object().shape({
    username: Yup.string().required("To pole jest wymagane"),
    email: Yup.string()
      .email("Wprowadź e-mail")
      .required("To pole jest wymagane"),
    password: Yup.string()
      .required("Wprowadź hasło")
      .matches(
        "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
        "Hasło musi zawierać 8 znaków, a w tym: 1 dużą literę, 1 cyfrę i 1 znak specjalny"
      ),
    passwordConfirm: Yup.string()
      .required("To pole jest wymagane")
      .oneOf([Yup.ref("password"), null], "Hasła muszą być takie same"),
  });

  const handleOnSubmit = (values) => {
    axios
      .post(`${API_BASE_URL}/users`, values)
      .then((response) => {
        enqueueSnackbar("Rejestracja zakończona sukcesem.");
        setTimeout(() => {
          navigateTo(`/logowanie`);
        }, 750);
        console.log("Użytkownik został zarejestrowany.", response.data);
      })
      .catch((error) => {
        enqueueSnackbar("Błąd rejestracji użytkownika.", { variant: "error" });
        console.error("Błąd podczas rejestracji użytkownika.", error);
      });
  };
  return (
    <MainLayout>
      <SnackbarProvider>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          onSubmit={handleOnSubmit}
          validationSchema={userSchema}
        >
          {({ handleChange }) => {
            return (
              <Form className="form">
                <p className="headingRegistration">Rejestracja</p>

                <TextField
                  sx={{
                    width: 350,
                    backgroundColor: theme.mode === "dark" ? "#666" : "#FFF",
                    color: theme.mode === "dark" ? "#EEE" : "#111",
                  }}
                  name="username"
                  label="Imię"
                  onChange={handleChange}
                />
                <ErrorMessage name="name" />
                <TextField
                  sx={{
                    width: 350,
                    backgroundColor: theme.mode === "dark" ? "#666" : "#FFF",
                    color: theme.mode === "dark" ? "#EEE" : "#111",
                    marginTop: "10px",
                  }}
                  name="email"
                  label="Email"
                  onChange={handleChange}
                />
                <ErrorMessage name="email" />
                <TextField
                  sx={{
                    width: 350,
                    backgroundColor: theme.mode === "dark" ? "#666" : "#FFF",
                    color: theme.mode === "dark" ? "#EEE" : "#111",
                    marginTop: "10px",
                  }}
                  name="password"
                  label="Hasło"
                  type="password"
                  onChange={handleChange}
                />
                <ErrorMessage name="password" />
                <TextField
                  sx={{
                    width: 350,
                    backgroundColor: theme.mode === "dark" ? "#666" : "#FFF",
                    color: theme.mode === "dark" ? "#EEE" : "#111",
                    marginTop: "10px",
                  }}
                  name="passwordConfirm"
                  label="Powtórz hasło"
                  type="password"
                  onChange={handleChange}
                />
                <ErrorMessage name="passwordConfirm" />
                <Button
                  sx={{
                    border: "1px solid black",
                    margin: "15px 0px 0px 0px",
                    width: 150,
                    height: 50,
                    fontWeight: 900,
                  }}
                  type="submit"
                >
                  Wyślij
                </Button>
                <Link to="/logowanie">
                  <p className="haveAccount">Masz juz konto? Zaloguj się</p>
                </Link>
              </Form>
            );
          }}
        </Formik>{" "}
      </SnackbarProvider>
    </MainLayout>
  );
}

export default Registration;
