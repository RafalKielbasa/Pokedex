import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { useSnackbar } from "notistack";
import { Box, Button, TextField, useTheme, css, styled } from "@mui/material";

import { useFetchLocalApi } from "../hooks/useFetchLocalApi";

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
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();

  const { items: usersFromData, error: usersFromDataError } =
    useFetchLocalApi("user");

  const handleSnackBar = (text, type) => {
    enqueueSnackbar(text, { variant: type });
  };

  const handleOnSubmit = (values) => {
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
      handleSnackBar("Login succes", "success");
      navigate("/EditList");
    } else {
      handleSnackBar("Login faild, wrong password or email", "error");
    }
  };

  return (
    <Container>
      <StyledLoginBox>
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
                  error={touched.email && errors.email}
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
                  error={touched.password && errors.password}
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
