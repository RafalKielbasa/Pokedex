import * as Yup from "yup";
export const editValidationSchema = Yup.object({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  base_experience: Yup.number().integer().positive().required("Required"),
  height: Yup.number().integer().positive().required("Required"),
  weight: Yup.number().integer().positive().required("Required"),
});
