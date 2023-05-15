import { ErrorMessage, Field, Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { postData } from "src/api";
import * as Yup from "yup";

const RegisterPage = () => {
  const regPasword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return (
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
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .matches(
            regPasword,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character "
          )
          .required("Required"),
        repeatPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        postData("users", values);
        setSubmitting(false);
        enqueueSnackbar("Rejestracja udana", { variant: "success" });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="userName">Nazwa Użytkownika</label>
            <Field
              name="userName"
              type="text"
              placeholder="Wprowadź nazwę użytkownika"
            ></Field>
            <ErrorMessage name="userName" />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <Field name="email" type="email" placeholder="Wprowadź email" />
            <ErrorMessage name="email" />
          </div>
          <div>
            <label htmlFor="password">Hasło</label>
            <Field
              name="password"
              type="password"
              placeholder="Wprowadź hasło"
            />
            <ErrorMessage name="password" />
          </div>
          <div>
            <label htmlFor="repeatPassword">Powtórz Hasło</label>
            <Field
              name="repeatPassword"
              type="password"
              placeholder="Powtórz hasło"
            />
            <ErrorMessage name="repeatPassword" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Wyślij
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterPage;
