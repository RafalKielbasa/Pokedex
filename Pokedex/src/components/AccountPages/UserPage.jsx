import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Typography, Container, Box, Select, FormControl, FormHelperText, MenuItem, InputLabel } from '@mui/material';
import PokemonEditForm from './PokemonEditForm';

const BASE_URL = "https://pokeapi.co/api/v2/";
const searchQuery = "pokemon?limit=150&offset=0";
const searchPath = `${BASE_URL}${searchQuery}`;

function UserPage({ setIsLogged}) {


  const [pokemonName, setpokemonName] = useState('')
  const [allPokemon, setallPokemon] = useState('')
  const [selectedPokemon, setselectedPokemon] = useState()
  const [formSubmitted, setFormSubmitted] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(searchPath);
      const data = await response.json();
      const dataDetails = await Promise.all(data.results.map(async (v) => { 
        const vDetails = await fetch(v.url);
        return await vDetails.json();
      }));

      const updatedPokemons = JSON.parse(localStorage.getItem("updatedPokemons")) || []
      
      let updatedDataDetails = dataDetails.map((pokemon) => {
        const pokemonInUpdatedPokemons = updatedPokemons.find((item) => item.id === pokemon.id);
        return pokemonInUpdatedPokemons ? pokemonInUpdatedPokemons : pokemon;
      });
      console.log(updatedDataDetails)


     

      console.log(updatedDataDetails)
      setallPokemon(updatedDataDetails);

    };
    fetchData();
  }, [pokemonName,formSubmitted]);


  const handleChange = (event) => {
    const pokemon = allPokemon.find(p => p.name === event.target.value);
    setselectedPokemon(pokemon);
    console.log(pokemon)
    setpokemonName(event.target.value);
  };

  const handleLogoutClick = () => {
    setIsLogged(false);
    localStorage.setItem("logged", JSON.stringify(false));
  }

  return (
    <>
      <Container sx={{display: "flex", justifyContent: "Center", flexWrap: "wrap"}}>  
      <Typography variant='h4' sx={{justifySelf: "flex-end"}}>User Page</Typography>
      <Button variant="contained" onClick={handleLogoutClick} sx={{justifySelf: "flex-end"}}>Wyloguj</Button>
<Box sx={{display: "flex", width: "100%", mt: 5}}></Box>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Pokemon Name</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={pokemonName}
          label="Pokemon Name"
          onChange={handleChange}
          MenuProps={{ PaperProps: { sx: { maxHeight: 400 } }

          }}
        >
          
          {allPokemon && allPokemon.map((item) => 
            <MenuItem key={item.id} value={`${item.name}`}>{`${item.name}`}</MenuItem>
          )}
        

        </Select>
        <FormHelperText>Choose Pokomen</FormHelperText>
      </FormControl>

      {pokemonName && <PokemonEditForm pokemonName={pokemonName} selectedPokemon={selectedPokemon} setselectedPokemon={setselectedPokemon} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} />}

      </Container>
    </>
  )
}

export default UserPage;