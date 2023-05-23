import { useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { fetchUsers } from "src/api/fetchDataFunctions";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import styled from "styled-components";
import GlobalContext from "src/context/GlobalContext";
import { loginValidationSchema } from "src/validationSchemas";
import { StyledFormField, StyledValidationError } from "src/components";
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
const LogInPage = () => {
  const { theme } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { setLoggedIn, setUser } = useContext(GlobalContext);
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    staleTime: 10 * (60 * 1000),
  });
  return (
    <Formik
      initialValues={{
        userName: "",
        password: "",
      }}
      validationSchema={loginValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const filteredUsers = users?.filter(({ userName }) => userName === values?.userName);
        if (values?.password === filteredUsers[0]?.password) {
          setSubmitting(false);
          setLoggedIn(true);
          setUser(values);
          enqueueSnackbar("Zostałeś zalogowany", {
            variant: "success",
          });
          navigate(`/edit`);
        } else {
          enqueueSnackbar("Dane logowania niepoprawne", { variant: "error" });
          setSubmitting(false);
        }
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
            <FormHeader>Zaloguj się</FormHeader>
            <FormInfo>Wypełnij poniższe pola aby zalogować się na konto</FormInfo>
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
              <StyledButton type="submit" disabled={isSubmitting}>
                Zaloguj
              </StyledButton>
            </FormRowContainer>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default LogInPage;
