import { ErrorMessage, Field, Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { postData } from "src/api/postDataFunctions";
import { registerValidationSchema } from "src/validationSchemas";
import styled from "styled-components";
const FormRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
`;

const RegisterPage = () => {
  return (
    <Formik
      initialValues={{
        userName: "",
        email: "",
        password: "",
        repeatPassword: "",
      }}
      validationSchema={registerValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        postData("users", values);
        setSubmitting(false);
        enqueueSnackbar("Rejestracja udana", { variant: "success" });
      }}
    >
      {({ isSubmitting }) => (
        <FormContainer>
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "24px",
            }}
          >
            <FormRowContainer>
              <label htmlFor="userName">Nazwa Użytkownika</label>
              <Field
                name="userName"
                type="text"
                placeholder="Wprowadź nazwę użytkownika"
              ></Field>
              <ErrorMessage name="userName" />
            </FormRowContainer>
            <FormRowContainer>
              <label htmlFor="email">E-mail</label>
              <Field name="email" type="email" placeholder="Wprowadź email" />
              <ErrorMessage name="email" />
            </FormRowContainer>
            <FormRowContainer>
              <label htmlFor="password">Hasło</label>
              <Field
                name="password"
                type="password"
                placeholder="Wprowadź hasło"
              />
              <ErrorMessage name="password" />
            </FormRowContainer>
            <FormRowContainer>
              <label htmlFor="repeatPassword">Powtórz Hasło</label>
              <Field
                name="repeatPassword"
                type="password"
                placeholder="Powtórz hasło"
              />
              <ErrorMessage name="repeatPassword" />
            </FormRowContainer>
            <FormRowContainer>
              <button type="submit" disabled={isSubmitting}>
                Wyślij
              </button>
            </FormRowContainer>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default RegisterPage;
