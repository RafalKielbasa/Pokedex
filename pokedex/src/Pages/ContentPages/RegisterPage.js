import { ErrorMessage, Field, Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { postData } from "src/api/postDataFunctions";
import { registerValidationSchema } from "src/validationSchemas";
import styled from "styled-components";
import { StyledFormField, StyledValidationError } from "src/Pages/components";
const FormRowContainer = styled.div`
  display: flex;
  width: 600px;
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
`;
const FormHeader = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
const FormInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;
const StyledButton = styled.button`
  background: green;
  margin-top: 30px;
  margin-bottom: 15px;
  width: 45%;
  height: 12%;
  font-size: 24px;
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
              border: "2px solid black",
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              fontSize: "24px",
            }}
          >
            <FormHeader>Utwórz konto</FormHeader>
            <FormInfo>Wypełnij poniższe pola aby, utworzyć konta</FormInfo>
            <FormRowContainer>
              <label htmlFor="userName">Nazwa Użytkownika</label>
              <Field
                name="userName"
                type="text"
                placeholder="Wprowadź nazwę użytkownika"
                as={StyledFormField}
              ></Field>
              <ErrorMessage name="userName" component={StyledValidationError} />
            </FormRowContainer>
            <FormRowContainer>
              <label htmlFor="email">E-mail</label>
              <Field name="email" type="email" placeholder="Wprowadź email" as={StyledFormField} />
              <ErrorMessage name="email" component={StyledValidationError} />
            </FormRowContainer>
            <FormRowContainer>
              <label htmlFor="password">Hasło</label>
              <Field
                name="password"
                type="password"
                placeholder="Wprowadź hasło"
                as={StyledFormField}
              />
              <ErrorMessage name="password" component={StyledValidationError} />
            </FormRowContainer>
            <FormRowContainer>
              <label htmlFor="repeatPassword">Powtórz Hasło</label>
              <Field
                name="repeatPassword"
                type="password"
                placeholder="Powtórz hasło"
                as={StyledFormField}
              />
              <ErrorMessage name="repeatPassword" component={StyledValidationError} />
            </FormRowContainer>
            <FormRowContainer>
              <StyledButton type="submit" disabled={isSubmitting}>
                Wyślij
              </StyledButton>
            </FormRowContainer>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default RegisterPage;
