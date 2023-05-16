import { useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { fetchUsers } from "src/api";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
const LogInPage = () => {
  const navigate = useNavigate();
  const [logIn, setLogIn] = useState(false);
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    staleTime: 10 * (60 * 1000),
  });
  console.log(logIn);
  return (
    <Formik
      initialValues={{
        userName: "",
        password: "",
      }}
      validationSchema={Yup.object({
        userName: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={({ userName, password }, { setSubmitting }) => {
        if (
          userName === users[0]?.userName &&
          password === users[0]?.password
        ) {
          setSubmitting(false);
          setLogIn(true);
          enqueueSnackbar("Zostałeś zalogowany", {
            variant: "success",
          });
          navigate(`/edit`);
        } else {
          enqueueSnackbar("Dane logowania niepoprawne", { variant: "error" });
        }
        console.log(
          { userName, password },
          users[0].userName,
          users[0]?.password
        );
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="userName">Nazwa Użytkownika</label>
            <Field
              name="userName"
              type="text"
              placeholder="Nazwa Użwytkownika"
            ></Field>
            <ErrorMessage name="userName" />
          </div>
          <div>
            <label htmlFor="password">E-mail</label>
            <Field
              name="password"
              type="password"
              placeholder="Wprowadź Hasło"
            />
            <ErrorMessage name="password" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Zaloguj
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LogInPage;
