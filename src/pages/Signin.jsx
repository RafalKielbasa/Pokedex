import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Formik, Form, Field } from "formik";
import { Box, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material";
import axios from "axios";
import * as Yup from "yup";

import styled from "styled-components";

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid black;
  margin-top: 30px;
  background-color: ${({ theme }) => theme.palette.background.default};
  width: 300px;
  height: 350px;

  & h1 {
    margin-bottom: 16px;
  }
`;

const StyledTextField = styled(TextField)`
  background-color: ${({ theme }) => theme.palette.background.contrast};
`;

const StyledButton = styled(Button)`
  margin-top: 8px;
`;

const userSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy adres e-mail.")
    .required("Adres e-mail jest wymagany."),
  password: Yup.string().required("Hasło jest wymagane."),
});

export default function Signin({ setUserData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [test, setTest] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:3001/user")
      .then((response) =>
        setTest(
          response.data?.filter((item) => {
            return item.name && item.password;
          })
        )
      )
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (text, type) => {
    enqueueSnackbar(text, { variant: type });
  };

  const handleOnSubmit = (values, actions) => {
    setIsSubmitting(true);
    console.log(values);
    actions.setSubmitting(false);
    setUserInfo(values);
    checkLogin(values);
  };

  const checkLogin = (userData) => {
    const currLog = userData.email;
    const currPass = userData.password;
    const filtered = test.filter((item) => {
      return item.email === currLog;
    });

    if (filtered[0].password === currPass && filtered[0].email === currLog) {
      localStorage.setItem("userData", JSON.stringify(userData));
      setUserData(userData);
      handleClick("Login succes", "success");
      navigate("/EditList");
    } else {
      handleClick("Login faild, wrond password or email", "error");
    }
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
          backgroundColor: theme.palette.background.default,
          width: "300px",
          height: "350px",
        }}
      >
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
      </Box>
    </Box>
  );
}
