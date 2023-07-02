import React from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { postUsersData } from "src/api/postData";
import { AppContext } from "src/context/AppContext";
import { Button, Input } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { ThemeProvider } from "@mui/material/styles";
import { registrationSchema } from "src/schemas/registrationSchema";

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

const Registration = () => {
  const [usersEmails, setUsersEmails] = useState([]);

  const { theme, theme2, isDark } = useContext(AppContext);
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
    <SiteWrapper theme={theme}>
      <ThemeProvider theme={theme2}>
        <Formik
          initialValues={{ name: "", email: "", pass: "", repPass: "" }}
          onSubmit={handleOnSubmit}
          validationSchema={registrationSchema}
        >
          {({ values, handleChange, handleSubmit }) => {
            return (
              <FormWrapper
                style={{ color: `${isDark ? "white" : "black"}` }}
                onSubmit={handleSubmit}
              >
                <h2 style={{ color: `${isDark ? "white" : "black"}` }}>
                  Rejestracja
                </h2>
                <Input
                  name="name"
                  placeholder="Imię"
                  value={values.name}
                  style={{ color: `${isDark ? "white" : "black"}` }}
                  onChange={handleChange}
                />
                <ErrorMessage name="name" />
                <Input
                  name="email"
                  value={values.email}
                  placeholder="E-mail"
                  type="email"
                  style={{ color: `${isDark ? "white" : "black"}` }}
                  onChange={handleChange}
                />
                <ErrorMessage name="email" />
                <Input
                  name="pass"
                  value={values.pass}
                  placeholder="Hasło"
                  type="password"
                  className="password"
                  style={{ color: `${isDark ? "white" : "black"}` }}
                  onChange={handleChange}
                />
                <ErrorMessage name="pass" />
                <Input
                  name="repPass"
                  value={values.repPass}
                  placeholder="Powtórz hasło"
                  type="password"
                  className="repPassword"
                  style={{ color: `${isDark ? "white" : "black"}` }}
                  onChange={handleChange}
                />
                <ErrorMessage name="repPass" />
                <Button
                  style={{ marginTop: "25px" }}
                  variant="outlined"
                  type="submit"
                  color={isDark ? "secondary" : "primary"}
                >
                  Utwórz konto
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
