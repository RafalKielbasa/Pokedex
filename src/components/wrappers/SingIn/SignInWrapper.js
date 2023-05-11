import { useFormik } from "formik";
import { Form, Input, Wrapper } from "../SingUp/SignUpWrapper.styles";
import { Button } from "@mui/material";

export const SignInWrapper = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      console.log("submited");
    },
  });

  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
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
