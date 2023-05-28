import * as Yup from "yup";
const regPasword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .max(15, "nazwa użytkownika musi się składać z maksymalnie 15 znaków")
    .required("to pole jest wymagane"),
  email: Yup.string().email("Pole musi zawierać adress email").required("to pole jest wymagane"),
  password: Yup.string()
    .matches(
      regPasword,
      "hasło musi zawierać co najmnie 8 znaków w tym : 1 dużą literę, 1 małą, 1 cyfrę i jeden znak specjalny"
    )
    .required("to pole jest wymagane"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "hasła muszą się zgadzać")
    .required("to pole jest wymagane"),
});
