import { Container, Box, TextField, Typography, Button } from '@mui/material'
import React from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as yup from 'yup';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

function PokemonEditForm({selectedPokemon, setselectedPokemon, pokemonName, setFormSubmitted, FormSubmitted}) {


 

    const pokemonFields = ["name", "id", "weight", "height", "base_experience"];
    const [addNewPokemon, setaddNewPokemon] = useState(false)
    useEffect(() => {

        let pokemonExpWithWins = (JSON.parse(localStorage.getItem("arenaResults")) || 0);
        const pokeExperience = (pokemonExpWithWins[selectedPokemon.id] || 0 )
        pokemonExpWithWins = selectedPokemon.base_experience + (
            pokeExperience * 10)


        formik.setValues({
          name: selectedPokemon.name,
          id: selectedPokemon.id,
          weight: selectedPokemon.weight,
          height: selectedPokemon.height,
          base_experience: pokemonExpWithWins
        });



      }, [selectedPokemon, FormSubmitted]);

    const handleAddNewPokemon = () => {
        setaddNewPokemon(true);
      }

    const validationSchema = yup.object({
        name: yup
          .string('Enter your email')
          .required('Email is required'),
          weight: yup
          .number('Enter your email')
          .required('Email is required'),
          id: yup
          .number('Enter your email')
          .required('Email is required'),
          height: yup
          .number('Enter your email')
          .required('Email is required'),
          base_experience: yup
          .number('Enter your email')
          .required('Email is required'),

    
      })
    
      const formik = useFormik({
            initialValues:{
            name: selectedPokemon.name,
            id: selectedPokemon.id,
            weight: selectedPokemon.weight,
            height: selectedPokemon.height,
            base_experience: selectedPokemon.base_experience,
          },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let updatedData = []
          let data = {
            name: values.name,
            id: values.id,
            weight: values.weight,
            height: values.height,
            base_experience: values.base_experience,
            };
            if (!addNewPokemon) {
          
            const existingData = JSON.parse(localStorage.getItem("updatedPokemons")) || [];
            const newData = {
                ...selectedPokemon,
                id: selectedPokemon.id,
                name: values.name,
                weight: parseInt(values.weight),
                height: parseInt(values.height),
                base_experience: parseInt(values.base_experience),
            };
            
             updatedData = [...existingData.filter(item => item.id !== selectedPokemon.id), newData];
            
        } else {

            const existingData = JSON.parse(localStorage.getItem("updatedPokemons")) || [];


            const newData = {
                ...selectedPokemon,
                id: parseInt(values.id),
                name: values.name,
                weight: parseInt(values.weight),
                height: parseInt(values.height),
                base_experience: parseInt(values.base_experience),
            };

             updatedData = [...existingData.filter(item => item.id !== selectedPokemon.id), newData];
             console.log(updatedData)

        }
        localStorage.setItem("updatedPokemons", JSON.stringify(updatedData));

            setaddNewPokemon(false);
            setFormSubmitted(!FormSubmitted);


        }
      });
    

  return (
    <Container>
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >

      <Typography component="h1" variant="h5">
       {"Edit Pokemon Stats"}
      </Typography>
      <img
        src={`${selectedPokemon.sprites.other.dream_world.front_default}?w=128&fit=crop&auto=format`}
        loading="lazy"
        height={150}
      />

<form onSubmit={formik.handleSubmit}>
    {pokemonFields.map((item) => {
        return  ( 
        <TextField
        fullWidth
        id={`${item}`}
        name={`${item}`}
        sx={{mt: 1, width: "75%"}}
        key={`${item}`}
        value={formik.values[item]}
        onChange={formik.handleChange}
        error={formik.touched.item && Boolean(formik.errors.item)}
        helperText={formik.touched.item && formik.errors.item}
      />)
    })}

        <Box> 
        <Button color="primary" variant="contained" fullWidth type="submit"   sx={{ mt: 3, mb: 2, width: "25%"}}>
        {"Edit Pokemon"}
        </Button>
        <Button color="primary" variant="contained"onClick={handleAddNewPokemon} fullWidth type="submit"   sx={{ mt: 3, mb: 2, width: "25%"}} >
        {"Add New Pokemon"}
        </Button>
        </Box>
      </form>
  
          

         
    </Box>



    </Container>
  )
}

export default PokemonEditForm





