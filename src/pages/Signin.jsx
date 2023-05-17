import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Formik, Form, Field } from "formik";
import { Box, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material";
import axios from "axios";
import * as Yup from "yup";

import styled, { css } from "styled-components";

const Container = styled("div")(
  ({ theme }) =>
    css`
      display: flex;
      justify-content: center;
      background-color: ${theme.palette.background.contrast};
      height: 100vh;
    `
);

const StyledLoginBox = styled("div")(
  ({ theme }) =>
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid black;
      margin-top: 30px;
      background-color: ${theme.palette.background.default};
      width: 300px;
      height: 350px;
    `
);

const userSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy adres e-mail.")
    .required("Adres e-mail jest wymagany."),
  password: Yup.string().required("Hasło jest wymagane."),
});

const Signin = ({ setUserData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [usersFromData, setUsersFromData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:3001/user")
      .then((response) => setUsersFromData(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (text, type) => {
    enqueueSnackbar(text, { variant: type });
  };

  const handleOnSubmit = (values, actions) => {
    setIsSubmitting(true);
    actions.setSubmitting(false);
    setUserInfo(values);
    checkLogin(values);
  };

  const checkLogin = (userData) => {
    const currLog = userData.email;
    const currPass = userData.password;

    const passwordCheck = usersFromData.find(
      (item) => item.password === currPass
    );
    const emailCheck = usersFromData.find((item) => item.email === currLog);

    if (passwordCheck && emailCheck) {
      localStorage.setItem("userData", JSON.stringify(userData));
      setUserData(userData);
      handleClick("Login succes", "success");
      navigate("/EditList");
    } else {
      handleClick("Login faild, wrong password or email", "error");
    }
  };

  return (
    <Container theme={theme}>
      <StyledLoginBox theme={theme}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleOnSubmit}
          validationSchema={userSchema}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Box marginBottom={2}>
                <h1>Logowanie</h1>
              </Box>
              <Box marginBottom={2}>
                <Field
                  as={TextField}
                  type="email"
                  name="email"
                  label="Adres e-mail"
                  error={touched.email && errors.email ? true : false}
                  helperText={touched.email && errors.email ? errors.email : ""}
                  style={{ background: theme.palette.background.contrast }}
                />
              </Box>
              <Box marginBottom={2}>
                <Field
                  as={TextField}
                  type="password"
                  name="password"
                  label="Hasło"
                  fullWidth
                  error={touched.password && errors.password ? true : false}
                  helperText={
                    touched.password && errors.password ? errors.password : ""
                  }
                  style={{ background: theme.palette.background.contrast }}
                />
              </Box>
              <Box display="flex" justifyContent="center" marginBottom={2}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Zaloguj
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </StyledLoginBox>
    </Container>
  );
};

export default Signin;
