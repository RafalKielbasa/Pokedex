import * as Yup from "yup";
const regPasword =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const registerValidationSchema = Yup.object({
  userName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .matches(
      regPasword,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character "
    )
    .required("Required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});
