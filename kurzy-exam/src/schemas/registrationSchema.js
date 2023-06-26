import * as Yup from "yup";
import YupPassword from "yup-password";

const yup = require("yup");
require("yup-password")(yup);
YupPassword(yup);

export const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Nazwa Użytkownika musi zawierać minumum 2 znaki")
    .required("To pole jest wymagane"),
  email: Yup.string().email().required("To pole jest wymagane"),
  pass: Yup.string()
    .minUppercase(1, "Hasło musi posiadać przynajmniej jedną dużą literę")
    .minNumbers(1, "Hasło musi posiadać przynajmniej jedną cyfrę")
    .minSymbols(1, "Hasło musi posiadać przynajmniej jeden znak specjalny")
    .min(8, "Hasło musi zawierać minimum 8 znaków")
    .required("To pole jest wymagane"),
  repPass: Yup.string()
    .minUppercase(1, "Hasło musi posiadać przynajmniej jedną dużą literę")
    .minNumbers(1, "Hasło musi posiadać przynajmniej jedną cyfrę")
    .minSymbols(1, "Hasło musi posiadać przynajmniej jeden znak specjalny")
    .min(8, "Hasło musi zawierać minimum 8 znaków")
    .required("To pole jest wymagane"),
});
