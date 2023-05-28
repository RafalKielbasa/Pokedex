import { Form, Formik } from "formik";

import { enqueueSnackbar } from "notistack";

import { useQuery } from "@tanstack/react-query";

import { postUser } from "src/api/postDataFunctions";

import { registerValidationSchema } from "src/validationSchemas";

import { fetchUsers } from "src/api/fetchDataFunctions";

import {
  FormContainer,
  FormHeader,
  FormInfo,
  MyTextField,
  StyledSubmitButton,
} from "src/components/formComponents";

const RegisterPage = () => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      }}
      validationSchema={registerValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const filteredUsers = users?.map(({ name }) => name);
        if (!filteredUsers.includes(values?.name)) {
          postUser("users", values);
          enqueueSnackbar("Rejestracja udana", { variant: "success" });
        } else enqueueSnackbar("Ta nazwa użytkownika jest zajęta", { variant: "error" });
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
              width: "70%",
              flexDirection: "column",
              fontSize: "24px",
              padding: "3%",
            }}
          >
            <FormHeader value={"Utwórz konto"} />
            <FormInfo value={"Wypełnij poniższe pola aby, utworzyć konta"} />
            <MyTextField
              name="name"
              type="text"
              label="Nazwa Użytkownika"
              placeholder="Wprowadź nazwę użytkownika"
            />
            <MyTextField name="email" type="email" label="E-mail" placeholder="Wprowadź email" />
            <MyTextField
              name="password"
              type="password"
              label="Hasło"
              placeholder="Wprowadź hasło"
            />
            <MyTextField
              name="repeatPassword"
              type="password"
              label="Powtórz hasło"
              placeholder="Powtórz hasło"
            />
            <StyledSubmitButton value={"Wyślij"} disableConditions={isSubmitting} />
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default RegisterPage;
