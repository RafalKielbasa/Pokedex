import * as Yup from "yup";
export const loginValidationSchema = Yup.object({
  name: Yup.string().required("To pole jest wymagane"),
  password: Yup.string().required("To pole jest wymagane"),
});
