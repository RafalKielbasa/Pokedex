import * as Yup from "yup";
export const loginValidationSchema = Yup.object({
  userName: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});
