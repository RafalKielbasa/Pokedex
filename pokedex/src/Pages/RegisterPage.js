import { useFormik } from "formik";
import React from "react";

const RegisterPage = () => {
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  console.log({ formik });
  return (
    <form onSubmit={formik?.handleSubmit}>
      <label htmlFor="userName">Nazwa Użytkownika</label>
      <input
        id="userName"
        name="userName"
        type="text"
        placeholder="Wprowadź nazwę użytkownika"
        onChange={formik?.handleChange}
        value={formik?.values?.userName}
      />
      <label htmlFor="email">E-mail</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Wprowadź email"
        onChange={formik?.handleChange}
        value={formik?.values?.email}
      />
      <label htmlFor="password">Hasło</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Wprowadź hasło"
        onChange={formik?.handleChange}
        value={formik?.values?.password}
      />
      <label htmlFor="repeatPassword">Powtórz Hasło</label>
      <input
        id="repeatPassword"
        name="repeatPassword"
        type="password"
        placeholder="Powtórz hasło"
        onChange={formik?.handleChange}
        value={formik?.values?.repeatPassword}
      />
      <button type="submit">Wyślij</button>
    </form>
  );
};

export default RegisterPage;
