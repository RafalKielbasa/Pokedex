import { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import styled from "styled-components";

const Container2 = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 50px;
`;

const userSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy adres e-mail.")
    .required("Adres e-mail jest wymagany."),
  password: Yup.string().required("Hasło jest wymagane."),
});

export default function Logowanie() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [test, setTest] = useState([]);
  // console.log("rejestr", test);
  // console.log("userInfo", userInfo);

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

  const handleOnSubmit = (values, actions) => {
    setIsSubmitting(true);
    console.log(values);
    actions.setSubmitting(false);
    setUserInfo(values);
    checkLogin(values);
  };

  const checkLogin = (gwo) => {
    const currLog = gwo.email;
    const currPass = gwo.password;
    const filtered = test.filter((item) => {
      console.log("dupa", item);
      return item.email === currLog;
    });
    console.log(filtered);

    if (filtered[0].password === currPass && filtered[0].email === currLog) {
      console.log("zalogowano");
    } else {
      console.log("bledne haslo lub login");
    }
  };

  return (
    <Container
      sx={{
        marginTop: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "300px",
        border: "1px solid black",
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
    </Container>
  );
}
