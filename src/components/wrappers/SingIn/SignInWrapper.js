import { useFormik } from "formik";
import { Form, Wrapper } from "../SingUp/SignUpWrapper.styles";
import { Button, TextField } from "@mui/material";
//import { getUser } from "../../../services/api";
import { useSignInMutation } from "../../../hooks/useSignIn";

export const SignInWrapper = () => {
  const { mutate } = useSignInMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          name="email"
          type="email"
          label="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <TextField
          variant="outlined"
          name="password"
          type="password"
          label="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <Button variant="contained" type="submit" sx={{ marginTop: 5 }}>
          Sing in
        </Button>
      </Form>
    </Wrapper>
  );
};
