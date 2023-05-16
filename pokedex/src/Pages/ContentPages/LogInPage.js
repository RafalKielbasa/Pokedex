import { useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { fetchUsers } from "src/api";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import GlobalContext from "src/context/GlobalContext";
const LogInPage = () => {
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
      validationSchema={Yup.object({
        userName: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const filteredUsers = users?.filter(
          ({ userName }) => userName === values?.userName
        );
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
