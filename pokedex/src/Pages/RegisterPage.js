import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const RegisterPage = () => {
  return (
    <>
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
          repeatPassword: "",
        }}
        validationSchema={Yup.object({
          userName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .matches(
              "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character "
            )
            .required("Required"),
          repeatPassword: Yup.string().oneOf(
            [Yup.ref("password")],
            "Passwords must match"
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <label htmlFor="userName">Nazwa Użytkownika</label>
          <Field
            name="userName"
            type="text"
            placeholder="Wprowadź nazwę użytkownika"
          />
          <ErrorMessage name="userName" />
          <label htmlFor="email">E-mail</label>
          <Field name="email" type="email" placeholder="Wprowadź email" />
          <ErrorMessage name="email" />
          <label htmlFor="password">Hasło</label>
          <Field name="password" type="password" placeholder="Wprowadź hasło" />
          <ErrorMessage name="password" />
          <label htmlFor="repeatPassword">Powtórz Hasło</label>
          <Field
            name="repeatPassword"
            type="password"
            placeholder="Powtórz hasło"
          />
          <ErrorMessage name="repeatPassword" />
          <button type="submit">Wyślij</button>
        </Form>
      </Formik>
    </>
  );
};

export default RegisterPage;
