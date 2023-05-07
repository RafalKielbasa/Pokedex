import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import UserPage from './UserPage';
import { SnackbarProvider, useSnackbar } from 'notistack';


function LogIn({ setIsLogged }) {

const [isRegistered, setisRegistered] = useState(false);
const navigate = useNavigate();
const { enqueueSnackbar } = useSnackbar();



const handleLogInBtn = () => {
  setisRegistered(!isRegistered)
}


  const validationSchema = !isRegistered ? yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character')
      .required('Password is required'),
      repeatedpassword: yup
      .string('Enter your password again')
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Repeated password is required'),
      name: yup
      .string('Enter your name')

  }) : yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
  
      .required('Password is required'),
 

  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      repeatedpassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      let data;
      if (isRegistered) {
        data = {
          email: values.email,
          password: values.password,
        };
      } else {
        data = {
          name: values.name,
          email: values.email,
          password: values.password,
          repeatedpassword: values.repeatedpassword,
        };
      }
      console.log(data)

      if (!isRegistered) {
        // Register the user
        axios
          .post('http://localhost:3000/users', data)
          .then(response => {
            setIsLogged(true);

            enqueueSnackbar('Registration successful', { variant: 'success' });

          })
          .catch(error => {
            console.log(error);
            enqueueSnackbar('Invalid email or password', { variant: 'error' });

          })
          
      } else {
        // Login the user
        axios
          .get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`)
          .then(response => {
            if (response.data.length > 0) {
              console.log("TES34T",data)
              setIsLogged(true);
              enqueueSnackbar('Login successful', { variant: 'success' });
              localStorage.setItem("logged", JSON.stringify(true));


            } else {
              console.log("TES3111114T",response)

              console.log('Invalid email or password');
              enqueueSnackbar('Invalid email or password', { variant: 'error' });

            }
          })
          .catch(error => {
            console.log(error);
            enqueueSnackbar('Invalid email or password', { variant: 'error' });

          })
       
      }
    }
  });


  return (
 <> 
    
    <Container component="main" maxWidth="xs">
   
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >

      <Typography component="h1" variant="h5">
       {isRegistered ? "Sign in" : "Sign Up"}
      </Typography>


<form onSubmit={formik.handleSubmit}>
      {!isRegistered && 
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          sx={{mt: 1}}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />}
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          sx={{my: 2}}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {!isRegistered && 
          <TextField
          fullWidth
          id="repeatedpassword"
          name="repeatedpassword"
          label="Repeated Password"
          sx={{my: 2}}
          type="password"
          value={formik.values.repeatedpassword}
          onChange={formik.handleChange}
          error={formik.touched.repeatedpassword && Boolean(formik.errors.repeatedpassword)}
          helperText={formik.touched.repeatedpassword && formik.errors.repeatedpassword}
        />}
        <Button color="primary" variant="contained" fullWidth type="submit"   sx={{ mt: 3, mb: 2 }}>
        {isRegistered ? 'Sign in' : 'Sign up'}
        </Button>
      </form>
  
          

         
   
            <Button onClick={handleLogInBtn} variant="body2">
            {isRegistered ?  "Don't have an account? Sign Up" : "Have an account? Log in" }
            </Button>
    </Box>
  </Container> 
  </>
  )
}

export default LogIn