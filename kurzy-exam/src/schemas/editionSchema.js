import * as Yup from "yup";

export const editionSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Imię musi zawierać minimum 2 znaki")
    .max(16, "Imię może zawierać maksimum 16 znaków")
    .required("To pole jest wymagane"),
  height: Yup.number("Wartość musi być liczbą")
    .min(1, "Minimalna wymagana wartość to 1")
    .max(9999999999, "Maksymalna akceptowalna wartość to 9999999999")
    .positive("Podana wartość nie może być mniejsza niż zero")
    .integer("Podana wartość musi być liczbą całkowitą")
    .required("To pole jest wymagane"),
  baseexp: Yup.number("Wartość musi być liczbą")
    .min(1, "Minimalna wymagana wartość to 1")
    .max(9999999999, "Maksymalna akceptowalna wartość to 9999999999")
    .positive("Podana wartość nie może być mniejsza niż zero")
    .integer("Podana wartość musi być liczbą całkowitą")
    .required("To pole jest wymagane"),
  weight: Yup.number("Wartość musi być liczbą")
    .min(1, "Minimalna wymagana wartość to 1")
    .max(9999999999, "Maksymalna akceptowalna wartość to 9999999999")
    .positive("Podana wartość nie może być mniejsza niż zero")
    .integer("Podana wartość musi być liczbą całkowitą")
    .required("To pole jest wymagane"),
  abilitie: Yup.string()
    .min(2, "Pole musi zawierać minimum 2 znaki")
    .max(15, "Pole może zawierać maksimum 15 znaków")
    .required("To pole jest wymagane"),
});
