import * as yup from "yup";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$&+,:;=?@#|'<>.-^*()%!]).{8,24}$/;

export const registerSchema = yup.object().shape({
  userName: yup
    .string()
    .min(3, "Nazwa użytkownika musi zawierać conajmniej 3 znaki")
    .required("Pole wymagane"),
  email: yup.string().email("Podaj poprawny e-mail").required("Pole wymagane"),
  password: yup
    .string()
    .min(8, "Hasło musi zawierać minimum 8 znaków")
    .matches(
      PASSWORD_REGEX,
      "Hasło musi zawierać dużą literę, cyfrę i znak specjalny."
    )
    .required("Pole wymagane"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Hasła muszą być takie same.")
    .required("Pole wymagane"),
});

export const loginSchema = yup.object().shape({
  userName: yup.string().required("Pole wymagane"),
  password: yup
    .string()
    .min(8, "Hasło musi zawierać minimum 8 znaków")
    .matches(
      PASSWORD_REGEX,
      "Hasło musi zawierać dużą literę, cyfrę i znak specjalny."
    )
    .required("Pole wymagane"),
});

export const pokemonEditSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Pokemon musi mieć w nazwie minimum 2 znaki.")
    .required("Pole wymagane"),
  weight: yup
    .number()
    .min(1, "Pokemon musi ważyć minimum 1.")
    .required("Pole wymagane"),
  height: yup
    .number()
    .min(1, "Pokemon musi mierzyć minimum 1.")
    .required("Pole wymagane"),
  base_experience: yup
    .number()
    .min(1, "Pokemon musi mieć minimum 1 base experience.")
    .required("Pole wymagane"),
});
