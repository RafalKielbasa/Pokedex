import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, Wrapper } from "./SignUp.styles";
import { Button } from "@mui/material";

const regularExpression = `^(?=.[A-Z])(?=.\d)(?=.[!@#$%^&()+-=[]{};':"\|,.<>/?])[\w!@#$%^&*()+-=[]{};':"\|,.<>/?]{8,}$`;

const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .matches(
      regularExpression,
      "Password must contain one capital letter, one number, one special sign and has at least 8 characters"
    )
    .required("required"),
  repeatPassword: Yup.string().oneOf([Yup.ref("password"), null]),
});

export const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: signUpSchema,
  });

  return (
    <Wrapper>
      <Form autoComplete="off">
        <Input
          name="name"
          placeholder="Enter your first name"
          value={formik.values.name}
        />

        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formik.values.password}
        />

        <Input
          name="repeatPassword"
          type="password"
          placeholder="Repeat your password"
          value={formik.values.repeatPassword}
        />

        <Button variant="contained">Sing Up</Button>
      </Form>
    </Wrapper>
  );
};
