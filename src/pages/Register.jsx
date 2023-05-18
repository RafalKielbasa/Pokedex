import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Box, Button, TextField, useTheme, css, styled } from "@mui/material";
import { useSnackbar } from "notistack";

const Container = styled("div")(
  ({ theme }) =>
    css`
      display: flex;
      justify-content: center;
      background-color: ${theme.palette.background.contrast};
      height: 100vh;
    `
);
const StyledRegisterBox = styled("div")(
  ({ theme }) =>
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid black;
      margin-top: 30px;
      background-color: ${theme.palette.background.default};
      width: 300px;
      max-height: 550px;
    `
);

const userSchema = Yup.object().shape({
  name: Yup.string().required("Imię jest wymagane."),
  email: Yup.string()
    .email("Nieprawidłowy adres e-mail.")
    .required("Adres e-mail jest wymagany."),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.*[a-z]).{8,}$/,
      "Haslo nie spelnia warunkow "
    )
    .required("Hasło jest wymagane."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Hasła muszą się zgadzać.")
    .required("Potwierdź hasło."),
});

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const handleOnSubmit = (values, actions) => {
    console.log(values);
    actions.setSubmitting(false);
    axios.post(`http://localhost:3001/user/`, {
      name: values.name,
      email: values.email,
      password: values.password,
    });
    handleClick();
  };

  const handleClick = () => {
    enqueueSnackbar("Register Succes", { variant: "success" });
  };

  return (
    <Container>
      <StyledRegisterBox>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleOnSubmit}
          validationSchema={userSchema}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Box marginBottom={2}>
                <h1>Register</h1>
              </Box>
              <Box marginBottom={2}>
                <Field
                  as={TextField}
                  name="name"
                  label="Imię"
                  error={touched.name && errors.name}
                  helperText={touched.name && errors.name ? errors.name : ""}
                  style={{ background: theme.palette.background.contrast }}
                />
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
              <Box marginBottom={2}>
                <Field
                  as={TextField}
                  type="password"
                  name="confirmPassword"
                  label="Potwierdź hasło"
                  fullWidth
                  error={touched.confirmPassword && errors.confirmPassword}
                  helperText={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : ""
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
                  Register
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </StyledRegisterBox>
    </Container>
  );
};

export default Register;
