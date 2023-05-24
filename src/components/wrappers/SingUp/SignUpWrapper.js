import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorMessage, Form, Wrapper } from "./SignUpWrapper.styles";
import { Button, TextField } from "@mui/material";

const passwordRegexp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .matches(
      passwordRegexp,
      "Password must contain one capital letter, one number, one special sign and has at least 8 characters"
    )
    .required("required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Required"),
});

export const SignUpWrapper = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: () => {},
  });

  console.log(formik.values);
  console.log(formik.errors);

  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <TextField
          label="Enter your first name"
          variant="outlined"
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.errors.name && formik.touched?.name ? (
          <ErrorMessage>{formik.errors.name}</ErrorMessage>
        ) : null}

        <TextField
          label="Enter your email"
          variant="outlined"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.errors.email && formik.touched?.email ? (
          <ErrorMessage>{formik.errors.email}</ErrorMessage>
        ) : null}

        <TextField
          label="Enter your password"
          variant="outlined"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.errors.password && formik.touched?.password ? (
          <ErrorMessage>{formik.errors.password}</ErrorMessage>
        ) : null}

        <TextField
          label="Repeat your password"
          variant="outlined"
          name="repeatPassword"
          type="password"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.repeatPassword && formik.touched?.repeatPassword ? (
          <ErrorMessage>{formik.errors.repeatPassword}</ErrorMessage>
        ) : null}

        <Button variant="contained" type="submit" sx={{ marginTop: 5 }}>
          Sing up
        </Button>
      </Form>
    </Wrapper>
  );
};
