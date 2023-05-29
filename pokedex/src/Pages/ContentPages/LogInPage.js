import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { Form, Formik } from "formik";

import { enqueueSnackbar } from "notistack";

import GlobalContext from "src/context/GlobalContext";

import { fetchUsers } from "src/api/fetchDataFunctions";

import { loginValidationSchema } from "src/validationSchemas";

import {
  FormContainer,
  FormHeader,
  MyTextField,
  StyledSubmitButton,
  FormInfo,
} from "src/components/formComponents";

const LogInPage = () => {
  const navigate = useNavigate();
  const { setLoggedIn, setUser } = useContext(GlobalContext);

  const {
    data: users,
    status,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    staleTime: 10 * (60 * 1000),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        password: "",
      }}
      validationSchema={loginValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (status === "loading") {
          enqueueSnackbar("Loading");
        }
        if (status === "error") {
          enqueueSnackbar(error.message, { variant: "error" });
        }
        const filteredUsers = users?.filter(
          ({ name }) => name === values?.name
        );
        if (values?.password === filteredUsers[0]?.password) {
          setLoggedIn(true);
          setUser(values);
          enqueueSnackbar("Zostałeś zalogowany", {
            variant: "success",
          });
          navigate("/edit");
        } else {
          enqueueSnackbar("Dane logowania niepoprawne", { variant: "error" });
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <FormContainer>
          <Form
            style={{
              border: "2px solid",
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              fontSize: "24px",
              padding: "3%",
            }}
          >
            <FormHeader value={"Zaloguj się"} />
            <FormInfo
              value={"Wypełnij poniższe pola aby zalogować się na konto"}
            />
            <MyTextField
              name="name"
              type="text"
              label="Nazwa Użytkownika"
              placeholder="Wprowadź nazwę użytkownika"
            />
            <MyTextField
              name="password"
              type="password"
              label="Hasło"
              placeholder="Wprowadź hasło"
            />
            <StyledSubmitButton
              value={"Zaloguj"}
              disableConditions={isSubmitting}
            />
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default LogInPage;
