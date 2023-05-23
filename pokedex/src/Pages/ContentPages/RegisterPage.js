import { ErrorMessage, Field, Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { useContext } from "react";
import { postData } from "src/api/postDataFunctions";
import { registerValidationSchema } from "src/validationSchemas";
import styled from "styled-components";
import { StyledFormField, StyledValidationError } from "src/Pages/components";
import GlobalContext from "src/context/GlobalContext";
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
  min-height: 82.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${(prop) => prop.theme.bgColor});
  color: ${(prop) => prop.theme.textColor};
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
  margin-top: 30px;
  margin-bottom: 15px;
  width: 45%;
  height: 12%;
  font-size: 24px;
`;
const RegisterPage = () => {
  const { theme } = useContext(GlobalContext);
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
        <FormContainer theme={theme}>
          <Form
            style={{
              border: "2px solid",
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
              <Field
                name="email"
                type="email"
                placeholder="Wprowadź email"
                as={StyledFormField}
              />
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
              <ErrorMessage
                name="repeatPassword"
                component={StyledValidationError}
              />
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
