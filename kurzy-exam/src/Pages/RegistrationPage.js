import React from "react";
import axios from "axios";
import * as Yup from "yup";
import YupPassword from "yup-password";
import styled, { css } from "styled-components";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { postUsersData } from "src/api/postData";
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

const yup = require("yup");
require("yup-password")(yup);
YupPassword(yup);

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Nazwa Użytkownika musi zawierać minumum 2 znaki")
    .required("To pole jest wymagane"),
  email: Yup.string().email().required("To pole jest wymagane"),
  pass: Yup.string()
    .minUppercase(1, "Hasło musi posiadać przynajmniej jedną dużą literę")
    .minNumbers(1, "Hasło musi posiadać przynajmniej jedną cyfrę")
    .minSymbols(1, "Hasło musi posiadać przynajmniej jeden znak specjalny")
    .min(8, "Hasło musi zawierać minimum 8 znaków")
    .required("To pole jest wymagane"),
  repPass: Yup.string()
    .minUppercase(1, "Hasło musi posiadać przynajmniej jedną dużą literę")
    .minNumbers(1, "Hasło musi posiadać przynajmniej jedną cyfrę")
    .minSymbols(1, "Hasło musi posiadać przynajmniej jeden znak specjalny")
    .min(8, "Hasło musi zawierać minimum 8 znaków")
    .required("To pole jest wymagane"),
});

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
  const [usersEmails, setUsersEmails] = useState([]);

  const { theme, toggleTheme, isDark } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };

  const getUsers = async () => {
    const response = await axios.get(`http://localhost:3001/users/`);
    const getUsersEmails = response?.data?.map((item) => item?.email);
    setUsersEmails(getUsersEmails);
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log(`usersEmails`, usersEmails);

  const handleOnSubmit = (values) => {
    getUsers();
    if (
      (values.pass === values.repPass) &
      !usersEmails.includes(values.email)
    ) {
      postUsersData("users", values);
      enqueueSnackbar(
        `Użytkownik ${values.name} został zarejestrowany. Zaloguj się aby uzyskać dostęp do wszystkich funckji aplikacji`,
        {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 7000,
        }
      );
      navigate("/login");
    }
    if ((values.pass === values.repPass) & usersEmails.includes(values.email)) {
      enqueueSnackbar(
        `Podany przez Ciebie e-mail znajduję się już w bazie danych`,
        {
          variant: "error",
          preventDuplicate: true,
          autoHideDuration: 5000,
        }
      );
    }
    if (values.pass !== values.repPass) {
      enqueueSnackbar(`Podane przez Ciebie hasła nie są ze sobą zgodne`, {
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
          initialValues={{ name: "", email: "", pass: "", repPass: "" }}
          onSubmit={handleOnSubmit}
          validationSchema={userSchema}
        >
          {({ values, handleChange, handleSubmit }) => {
            return (
              <FormWrapper onSubmit={handleSubmit}>
                <h2>Rejestracja</h2>
                <Input
                  name="name"
                  placeholder="Imię"
                  value={values.name}
                  onChange={handleChange}
                />
                <ErrorMessage name="name" />
                <Input
                  name="email"
                  value={values.email}
                  placeholder="E-mail"
                  type="email"
                  onChange={handleChange}
                />
                <ErrorMessage name="email" />
                <Input
                  name="pass"
                  value={values.pass}
                  placeholder="Hasło"
                  type="password"
                  className="password"
                  onChange={handleChange}
                />
                <ErrorMessage name="pass" />
                <Input
                  name="repPass"
                  value={values.repPass}
                  placeholder="Powtórz hasło"
                  type="password"
                  className="repPassword"
                  onChange={handleChange}
                />
                <ErrorMessage name="repPass" />
                <Button
                  style={{ marginTop: "25px" }}
                  variant="outlined"
                  type="submit"
                >
                  Utwórz konto
                </Button>
                <Button
                  style={{
                    marginTop: "25px",
                    background: "none",
                    textDecoration: "underline",
                  }}
                  onClick={handleClick}
                >
                  Masz już konto ? Zaloguj się tu
                </Button>
              </FormWrapper>
            );
          }}
        </Formik>
      </ThemeProvider>
    </SiteWrapper>
  );
};
export default Registration;
