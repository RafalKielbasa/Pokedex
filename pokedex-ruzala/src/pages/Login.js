import { Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useRef } from "react";
import fetchData from "../fetching/fetchData";
import { GlobalContext } from "../App";

export default function Login() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { setLoginState } = useContext(GlobalContext);

  const onSubmitto = async (values) => {
    const users = await fetchData("http://localhost:5000/users");
    const isRegistered = users.some(
      (user) =>
        user.userName === values.userName && user.password === values.password
    );
    setLoginState(isRegistered);
    if (isRegistered) {
      enqueueSnackbar("Zalogowano pomyślnie!", { variant: "success" });
      navigate("/");
    } else {
      enqueueSnackbar("Nazwa użytkownika lub hasło są nieprawidłowe!", {
        variant: "error",
      });
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: onSubmitto,
    });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.children[1].children[0].focus();
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
              ref={inputRef}
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

            <Button
              sx={{ marginY: "30px" }}
              type="submit"
              color="warning"
              variant="contained"
            >
              Zaloguj się
            </Button>
          </Box>
        </form>
      </Box>
      <Link to="/register">Nie masz konta? Zarejestruj się.</Link>
    </Box>
  );
}
