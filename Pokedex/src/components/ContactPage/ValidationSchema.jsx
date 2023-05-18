import * as yup from "yup";



export const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    name: yup
      .string('Enter your Name')
      .min(2, 'Name should be of minimum 2 characters length')
      .required('Name is required'),
    message: yup
    .string('Enter your message')
    .min(5, 'message should be of minimum 5 characters length')
    .required('message is required'),
    language: yup
    .string('Enter your message')
    .required('message is required')
    .oneOf(["React", "JS", "Vue"], "Invalid Job Type"),
    reason: yup
    .string('Enter your message')
    .required('message is required')

  });
  