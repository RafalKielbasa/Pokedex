import { useState } from "react";
import { useSnackbar } from "notistack";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material";
import axios from "axios";
import * as Yup from "yup";

const userSchema = Yup.object().shape({
  name: Yup.string().required("Imię jest wymagane."),
  email: Yup.string()
    .email("Nieprawidłowy adres e-mail.")
    .required("Adres e-mail jest wymagany."),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.*[a-z]).{8,}$/,
      "Hasło musi składać się z co najmniej 8 znaków, w tym co najmniej 1 dużej litery, 1 cyfry i 1 znaku specjalnego."
    )
    .required("Hasło jest wymagane."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Hasła muszą się zgadzać.")
    .required("Potwierdź hasło."),
});

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const handleOnSubmit = (values, actions) => {
    setIsSubmitting(true);
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
    <Box
      sx={{
        display: "flex",
        alignItems: "felx-start",
        justifyContent: "center",
      }}
      style={{
        backgroundColor: theme.palette.background.contrast,
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "3px solid black",
          marginTop: "30px",
        }}
        style={{
          backgroundColor: theme.palette.background.login,
          width: "300px",
          maxHeight: "550px",
        }}
      >
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
                  error={touched.name && errors.name ? true : false}
                  helperText={touched.name && errors.name ? errors.name : ""}
                />
              </Box>
              <Box marginBottom={2}>
                <Field
                  as={TextField}
                  type="email"
                  name="email"
                  label="Adres e-mail"
                  error={touched.email && errors.email ? true : false}
                  helperText={touched.email && errors.email ? errors.email : ""}
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
                />
              </Box>
              <Box marginBottom={2}>
                <Field
                  as={TextField}
                  type="password"
                  name="confirmPassword"
                  label="Potwierdź hasło"
                  fullWidth
                  error={
                    touched.confirmPassword && errors.confirmPassword
                      ? true
                      : false
                  }
                  helperText={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : ""
                  }
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
      </Box>
    </Box>
  );
}
