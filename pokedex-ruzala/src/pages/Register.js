import { Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { registerSchema } from "../schemas";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import fetchData from "../fetching/fetchData";

export default function Register() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [usersLength, setUsersLength] = useState(0);

  const onSubmit = async (values, actions) => {
    axios
      .post("http://localhost:5000/users", { id: usersLength + 1, ...values })
      .then((response) => {
        console.log("zrobione");
      });
    actions.resetForm();
    enqueueSnackbar("Zarejestrowano pomyślnie! Proszę się zalogować", {
      variant: "success",
    });
    navigate("/login");
  };
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  useEffect(() => {
    const users = fetchData("http://localhost:5000/users");
    setUsersLength(users.length);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ marginTop: "50px", width: "50%", height: "100%" }}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              margin="normal"
              error={touched.userName && errors.userName && true}
              id="userName"
              name="userName"
              label="Nazwa użytkownika"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.userName && errors.userName && `${errors.userName}`
              }
            />
            <TextField
              margin="normal"
              error={touched.email && errors.email && true}
              id="email"
              name="email"
              label="E-Mail"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.email && errors.email && `${errors.email}`}
            />
            <TextField
              margin="normal"
              error={touched.password && errors.password && true}
              id="password"
              name="password"
              label="Hasło"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.password && errors.password && `${errors.password}`
              }
            />
            <TextField
              margin="normal"
              error={touched.confirmPassword && errors.confirmPassword && true}
              id="confirmPassword"
              name="confirmPassword"
              label="Potwierdź Hasło"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.confirmPassword &&
                errors.confirmPassword &&
                `${errors.confirmPassword}`
              }
            />
            <Button
              sx={{ marginY: "30px" }}
              type="submit"
              disabled={isSubmitting}
              variant={isSubmitting ? "outlined" : "contained"}
              color="warning"
            >
              Zarejestruj się
            </Button>
          </Box>
        </form>
      </Box>
      <Link to="/register">Masz konto? Zaloguj się.</Link>
    </Box>
  );
}
