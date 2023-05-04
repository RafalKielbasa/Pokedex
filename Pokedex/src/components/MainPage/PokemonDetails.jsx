import React from 'react'
import {Typography, Box, Container, IconButton, CardMedia, Button, } from '@mui/material'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PokemonCarousel from './PokemonCarousel'
import CloseIcon from '@mui/icons-material/Close';
import  { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';

const BASE_URL = 'https://pokeapi.co/api/v2/';
let data;



function PokemonDetails(props) {

const [showCardDetails, setshowCardDetails] = useState(props.showCardDetails);
const [fetchedDatabyID, setDatabyID] = useState([]);
const [loading, setLoading] = useState(true); 
const [classofPokemon, setclassofPokemon] = useState("");

const arenaPokemon = props.arena;
useEffect(() => {
    const fetchDatabyID = async () => {
    const response = await fetch(`${BASE_URL}pokemon/${props.cardID}`);
    data = await response.json();
        
      setclassofPokemon(data.types[0].type.name)
     
        setDatabyID(data);
        setLoading(false);
     
    };
 
    fetchDatabyID();

}, []);


  const closeCard = () => {
    setshowCardDetails(false);
    props.setshowCardDetails(false);
  };


  

  return (
  
<Box sx={{ position: `${arenaPokemon ? "block" : "absolute"}`, top: 0, left: 0, display: 'flex', justifyContent: `${arenaPokemon ? "space-between" : "center"}`, alignItems: 'center', width: '100vw', height: '100vh'}}> <Container sx={{ display: "flex", justifyContent: "center"}}> 

  <Box className={classofPokemon} sx={{
 position: `${arenaPokemon ? "block" : "absolute"}`,
 top: '50%',
 left: '50%',
 transform: 'translate(-50%, -50%)',
 width: '65%',
 height: '60%',
 boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
 borderRadius: '10px',
 display: 'flex',
 flexDirection: 'column',
 boxSizing: 'border-box',
 maxWidth: "sm"
 
  }}>
<IconButton size='large' onClick={closeCard} sx={{position: "absolute", right: 0, fontWeight: 700, color: "white"}}>
      <CloseIcon />
    </IconButton>
    {loading ? (
      // jeśli dane są w trakcie pobierania, wyświetl spinner lub jakiś inny komunikat o ładowaniu
      <Typography>Loading...</Typography>
    ) : (
      // w przeciwnym wypadku wyświetl element z pobranymi danymi
      <>
 <Box sx={{ display: 'flex', flexDirection: {xs: "column", sm:'row'}, p:5, justifyContent: {xs: "center", sm: "space-between"}}}>

          <Box sx={{width: '50%,', textAlign: {xs:"center"}}}>

            <Typography  sx={{ marginTop: {xs: 0, sm:7}, color: "white",fontSize: {xs: 30, md: 45} }}>{`${fetchedDatabyID.name.charAt(0).toUpperCase()}${fetchedDatabyID.name.slice(1)}`}</Typography>

            <Typography variant='h6' sx={{textAlign:"center", borderRadius: "20px", bgcolor: "rgba(255, 255, 255, 0.25)", width: {xs: "100%", sm:"70%"}, color:"white", p:0.5}}>{`${fetchedDatabyID.types[0].type.name.charAt(0).toUpperCase()}${fetchedDatabyID.types[0].type.name.slice(1)}`}</Typography>
            
            <Typography sx={{color:"white", marginTop: 3, display: {xs: "none", sm: "flex"}}}>{`Height: ${fetchedDatabyID.height}`}</Typography>
            <Typography sx={{color:"white", display: {xs: "none", sm: "flex"}}}>{`Weight: ${fetchedDatabyID.weight}`}</Typography>
            <Typography sx={{color:"white",  display: {xs: "none", sm: "flex"}}}>{`Exp: ${fetchedDatabyID.base_experience}`}</Typography>
          </Box>
          <Box sx={{width: {xs: "100%", sm:'50%'},mx: {xs: "auto", sm: 0} , display: {xs:"flex"}, justifyContent: {xs:"center", sm:"flex-end"}

        }}>
            <CardMedia
              component="img"
              sx={{ width: {xs: "155px", md:"225px"}, height: "225px", objectFit: 'contain'}}
              image={`${fetchedDatabyID.sprites.other.dream_world.front_default}`}
            />          
         </Box>
      </Box>

      <Box sx={{width: '100%', bgcolor: 'white', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;', borderRadius: '10px', boxSizing: "border-box", p:5, height: `calc(100% - 225px)`}}>
      <Typography variant='h5' sx={{fontWeight: 700}}>Stats</Typography>
      {fetchedDatabyID.stats.map((stat) => (
  <Box
    key={stat.stat.name}
    sx={{ display: 'flex', alignItems: 'center', mt: {xs: 0.5, sm:2 }}}
  >
    <Typography sx={{ width: {xs: "100%", sm: '30%'} }}>{stat.stat.name}</Typography>
    <Box sx={{ width: {xs: "100%", sm: '60%'}, mr: 1 }}>
      <LinearProgress
        variant="determinate"
        value={stat.base_stat > 100 ? 100 : stat.base_stat}
        className="progress-bar"
        sx={{
          height: 10,
          borderRadius: 5,
          bgcolor: 'grey.300',
          '& .MuiLinearProgress-bar': {
            borderRadius: '0 5px 5px 0',
            bgcolor: 'black',
          },
        }}
      />
    </Box>
    <Typography sx={{display: {xs: "none", sm:"inline-block"}}}>{stat.base_stat}</Typography>
  </Box>
))}
        </Box>

          </>
       




        )}



        </Box>

        </Container>

    </Box>
  

  
  )
}

export default PokemonDetails