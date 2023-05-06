import React from 'react'
import {Typography, Box, Container, IconButton, CardMedia, Button, } from '@mui/material'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';
import  { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';

const BASE_URL = 'https://pokeapi.co/api/v2/';
let data;



function ArenaCard(props) {

const [showCardDetails, setshowCardDetails] = useState(props.showCardDetails);
const [fetchedDatabyID, setDatabyID] = useState([]);
const [loading, setLoading] = useState(true); 
const [classofPokemon, setclassofPokemon] = useState("");
const [pokemonStats, setpokemonStats] = useState(0);
const [numOfWins, setnumOfWins] = useState(0);
const [numOfExp, setnumOfExp] = useState(0);


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

useEffect(() => {
    const arenaResults = JSON.parse(localStorage.getItem('arenaResults'));
    console.log("TT",arenaResults[props.cardID] )
    if (arenaResults && arenaResults[props.cardID]) {
      setnumOfWins(arenaResults[props.cardID])
   

    }
    const pokemonPoints = (fetchedDatabyID.base_experience + (numOfWins * 10)) * fetchedDatabyID.weight;
    setnumOfExp(fetchedDatabyID.base_experience + (numOfWins * 10))
    props.setpokemonStats(pokemonPoints)
 
}, [loading,props.pokemonArenaID, props.isWinner]);


  const removeFromArena = () => {
    console.log("TEST")
    let arenaPokemonsID = JSON.parse(localStorage.getItem("arenaPokemons"));
    {console.log(props.cardID)}
    arenaPokemonsID = arenaPokemonsID.filter((id) => id !== props.cardID)
    localStorage.setItem("arenaPokemons", JSON.stringify(arenaPokemonsID));
    props.setpokemonArenaID(arenaPokemonsID)
    props.setisFight(false)




  };


  

  return (
<> 


      
  <Box className={classofPokemon} sx={{

 boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
 borderRadius: '10px',
 width: "300px",
 height: "599px",
  }}>



    {loading ? (
      <Typography>Loading...</Typography>
    ) : (
      <> 


{(!props.isWinner && props.isFight ) ? ( 

<Box sx={{
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  alignContent: "center",
  height: "599px",
  width: "300px",
  position: "absolute",
  backgroundColor: `${!props.isWinner ? "rgba(0, 0, 0, 0.6)" : ""}`
   }}>
     <Typography variant='h4' sx={{width: "100%", textAlign: "center"}}>Lost</Typography>
    <Button variant="contained" onClick={removeFromArena} sx={{}} >Usun Pokemona Z Areny</Button> </Box> ) : (<> </>)}
      
      
      
      
      
      
      
      
      <Box sx={{  
    }}> 
         <IconButton size='large' onClick={removeFromArena} sx={{display: "flex",fontWeight: 700, color: "black", width: "100%", p:0, marginBottom: "-15px", justifyContent:"flex-end", paddingRight: 1, paddingTop: 1 }}>
      <CloseIcon  />
    </IconButton>
 <Box sx={{ display: 'flex', flexWrap:"wrap", p:3, justifyContent: "center"}}>

            <CardMedia
              component="img"
              sx={{ width: {xs: "125px", md:"125px"}, height: "125px", objectFit: 'contain',  
}}
              image={`${fetchedDatabyID.sprites.other.dream_world.front_default}`}
            />          
    
            <Typography  sx={{ color: "white" ,fontSize: {xs: 20, md: 25}, width: "100%", textAlign: "center"}}>{`${fetchedDatabyID.name.charAt(0).toUpperCase()}${fetchedDatabyID.name.slice(1)}`}</Typography>

            <Typography  sx={{textAlign:"center", borderRadius: "20px", bgcolor: "rgba(255, 255, 255, 0.25)", width: {xs: "100%", sm:"50%"}, color:"white", mx:5 }}>{`${fetchedDatabyID.types[0].type.name.charAt(0).toUpperCase()}${fetchedDatabyID.types[0].type.name.slice(1)}`}</Typography>
            
            <Typography sx={{color:"white", marginTop: 3, width: "100%", textAlign: "center"}}>{`Height: ${fetchedDatabyID.height} Weight: ${fetchedDatabyID.weight}`}</Typography>
    
            <Typography sx={{color:"white",  display: {xs: "none", sm: "flex"}}}>{`Exp: ${numOfExp} Wins:${numOfWins}`}</Typography>
          </Box>
       
          
      

      <Box sx={{width: '100%', bgcolor: 'white', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;', borderRadius: '10px', boxSizing: "border-box", p:3, height: `275px`,}}>
      <Typography variant='h5' sx={{fontWeight: 700,}}>Stats</Typography>
      {fetchedDatabyID.stats.map((stat) => (
  <Box
    key={stat.stat.name}
    sx={{ display: 'flex', alignItems: 'center', mt: 0.5}}
  >
    <Typography sx={{ width: {xs: "100%", sm: '30%'}, fontSize: 12 }}>{stat.stat.name}</Typography>
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

        </Box></>
       




        )}



        </Box>

       


  

        </>
  )
}

export default ArenaCard