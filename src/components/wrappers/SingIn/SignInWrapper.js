import { useFormik } from 'formik';
import { Form, Wrapper } from '../SingUp/SignUpWrapper.styles';
import { Button } from '@mui/material';
import { useSignInMutation } from '../../../hooks/useSignIn';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { StyledTextField } from '../HomePageWrapper/HomePageWrapper.styles';

export const SignInWrapper = () => {
  const { currentTheme } = useContext(ThemeContext);

  const { mutate } = useSignInMutation();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Wrapper theme={currentTheme}>
      <Form onSubmit={formik.handleSubmit}>
        <StyledTextField
          theme={currentTheme}
          variant="outlined"
          name="email"
          type="email"
          label="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <StyledTextField
          theme={currentTheme}
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
