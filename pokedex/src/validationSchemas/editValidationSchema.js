import * as Yup from "yup";
export const editValidationSchema = Yup.object({
  name: Yup.string()
    .max(15, "Pole musi zawierać mniej niż 15 znaków")
    .required("To pole jest wymagane"),
  base_experience: Yup.number("Wartość musi być liczbą")
    .integer("Wartość musi być liczbą całkowitą")
    .positive("Wartość musi być dodatnia")
    .required("To pole jest wymagane"),
  height: Yup.number("Wartość musi być liczbą")
    .integer("Wartość musi być liczbą całkowitą")
    .positive("Wartość musi być dodatnia")
    .required("To pole jest wymagane"),
  weight: Yup.number("Wartość musi być liczbą")
    .integer("Wartość musi być liczbą całkowitą")
    .positive("Wartość musi być dodatnia")
    .required("To pole jest wymagane"),
});
