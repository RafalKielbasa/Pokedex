import { Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import { postData } from "src/api/postDataFunctions";
import { registerValidationSchema } from "src/validationSchemas";
import {
  FormContainer,
  FormHeader,
  FormInfo,
  MyTextField,
  StyledSubmitButton,
} from "src/components";
const RegisterPage = () => {
  return (
    <Formik
      initialValues={{
        name: "",
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
              border: "2px solid",
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              fontSize: "24px",
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
            <MyTextField
              name="email"
              type="email"
              label="E-mail"
              placeholder="Wprowadź email"
            />
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
            <StyledSubmitButton
              value={"Wyślij"}
              disableConditions={isSubmitting}
            />
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default RegisterPage;
