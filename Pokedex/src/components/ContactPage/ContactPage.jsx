import React from 'react';
import { useState } from 'react';
import { TextField, Container, Typography, Button, Box, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useFormik } from 'formik';
import { validationSchema } from './Validationschema';
import  contactbanner  from '../../assets/contactbanner.png'
import { useContext } from 'react';
import { ThemeContext } from '../Global/ThemeContext';
import { useTheme } from "@mui/material";


function ContactPage() {
  const [language, setLanguage] = useState('');
  const [reason, setReason] = useState('');
  const theme = useTheme();
const colorMode = useContext(ThemeContext);


    const formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        language: '',
        reason: '',
        message: '',
      },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
          alert(JSON.stringify(values, null, 2));
          console.log(JSON.stringify(values, null, 2))
          actions.resetForm()
        },
        handleChange: (event, id) => {
          if (id === 'language') {
            setLanguage(event.target.value);
          } else if (id === 'reason') {
            setReason(event.target.value);
          }
        },
      });

  return (
      <>
<Container sx={{display: "flex", height: {xs: "100vh", md:"76.8vh"}, flexWrap: {xs:"wrap", md: "nowrap", }, justifyContent: "center"}}> 

<Box sx={{width: "75%", boxSizing: "border-box", paddingRight: {xs: 0, md: 6}, display: "flex", flexWrap: "wrap", alignContent: "center", color: theme.palette.color}}>
<Typography variant='h3' sx={{fontWeight: 700}}>Love to hear from you,</Typography>
<Typography variant='h4' sx={{fontWeight: 500}}>Get in touch</Typography>
<Typography  sx={{py: 3}}> 
If you have any questions or suggestions for our team, please do not hesitate to contact us. We love hearing from our users and are always looking for ways to improve our services.</Typography>

<img
        src={contactbanner}
        alt="contactbanner"
        style={{width: "100%"}}
      />



</Box> 


<Box sx={{width: "75%", display: "flex", flexWrap: "wrap", alignContent: "center", marginTop: {xs: "-20%", md:"0"}}}>
<Paper sx={{ height: {xs:"65%", md: "55%"}, display: "flex", flexWrap: "wrap", alignContent: "center", p: 2, py: {xs:5, md: 0}}}>
<form onSubmit={formik.handleSubmit}> 
    <Box sx={{display:"flex", justifyContent: "space-between", flexWrap: "wrap", }}> 
    <Typography  sx={{fontWeight: 700, width: "100%", fontSize: "35px", textAlign: "center", paddingBottom:2, color: theme.palette.color }}>Contact US</Typography>

    <TextField          
    id="name"
    name="name"
    label="Name" 
    variant="outlined"  
    sx={{flexBasis: {xs:"100%", md:"49%"}, paddingBottom: 2}}
    value={formik.values.name}
    onChange={formik.handleChange}
    error={formik.touched.name && Boolean(formik.errors.name)}
    helperText={(formik.touched.name && formik.errors.name) && "Please Enter Name"}

    />
    <TextField          
    id="email"
    name="email"
    label="Email" 
    variant="outlined"  
    sx={{flexBasis: {xs:"100%", md:"49%"}, paddingBottom: 2}}
    value={formik.values.email}
    onChange={formik.handleChange}
    error={formik.touched.email && Boolean(formik.errors.email)}
    />
      <FormControl   sx={{flexBasis: {xs:"100%", md:"49%"}, paddingBottom: 2}} >
        <InputLabel id="demo-simple-select-label">Reason For Contact</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.reason}
          label="Choose Language"
          onChange={(e) => {
            formik.setFieldValue('reason', e.target.value);
            setReason(e.target.value);
          }}
          error={formik.touched.reason && Boolean(formik.errors.reason)}
        >
          <MenuItem value={"Problem"}>Problem</MenuItem>
          <MenuItem value={"Question"}>Question</MenuItem>
          <MenuItem value={"Cooperation"}>Cooperation</MenuItem>
        </Select>
      </FormControl>

      <FormControl   sx={{flexBasis: {xs:"100%", md:"49%"}, paddingBottom: 2}} >
        <InputLabel id="demo-simple-select-label">Choose Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.language}
          label="Choose Language"
          onChange={(e) => {
            formik.setFieldValue('language', e.target.value);
            setLanguage(e.target.value);
          }}
          error={formik.touched.language && Boolean(formik.errors.language)}

        >
          <MenuItem value={"React"}>React</MenuItem>
          <MenuItem value={"Vue"}>Vue</MenuItem>
          <MenuItem value={"JS"}>JS</MenuItem>
        </Select>
      </FormControl>

      <TextField          
    id="message"
    name="message"
    label="Message" 
    variant="outlined"  
    multiline
    rows={4}
    fullWidth
    sx={{ paddingBottom: 2}}
    value={formik.values.message}
    onChange={formik.handleChange}
    error={formik.touched.message && Boolean(formik.errors.message)}
    />

   
    <Box sx={{display: "flex", justifyContent: "center", width: "100%"}}> 
    <Button 
    variant="contained"  
    type="submit" 
    sx={{width: "60%", backgroundColor: theme.palette.primary.main }}
    >Sign Up</Button> </Box>     

    </Box> </form></Paper></Box>

</Container>
 
    </>
  )
}

export default ContactPage