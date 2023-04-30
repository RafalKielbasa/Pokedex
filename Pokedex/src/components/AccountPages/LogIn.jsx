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


function LogIn({ setIsLogged }) {

const [isRegistered, setisRegistered] = useState(false);
const navigate = useNavigate();



  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      console.log(data)

      if (!isRegistered) {
        // Register the user
        axios
          .post('http://localhost:3000/users', data)
          .then(response => {
            setIsLogged(true);
            
          })
          .catch(error => {
            console.log(error);
          })
          
      } else {
        // Login the user
        axios
          .get(`http://localhost:3000/users?email=${dataemail}&password=${data.password}`)
          .then(response => {
            if (response.data.length > 0) {
              history.push('/user');
            } else {
              console.log('Invalid email or password');
            }
          })
          .catch(error => {
            console.log(error);
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
        <Button color="primary" variant="contained" fullWidth type="submit"   sx={{ mt: 3, mb: 2 }}>
        {isRegistered ? 'Sign in' : 'Sign up'}
        </Button>
      </form>
  
          

         
   
            <Link href="#" variant="body2">
            {isRegistered ?  "Don't have an account? Sign Up" : "Have an account? Log in" }
            </Link>
    </Box>
  </Container> 
  </>
  )
}

export default LogIn