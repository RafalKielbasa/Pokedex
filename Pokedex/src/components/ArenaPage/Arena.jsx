import React from 'react'
import { Typography, Grid, Pagination, Box, Button} from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { FavoriteContext } from "../Global/ThemeContext";
import PokemonCard from '../MainPage/PokemonCard';
import PokemonDetails from '../MainPage/PokemonDetails';
import ArenaCard from './ArenaCard';
function Arena() {

    const [isBothPokemon, setisBothPokemon] = useState(false);
    const [pokemonArenaID, setpokemonArenaID] = useState([]);
    const { favorites, toggleFavorite } = useContext(FavoriteContext);
    const [pokemon1Stats, setpokemon1Stats] = useState();
    const [pokemon2Stats, setpokemon2Stats] = useState();


    let localStorageArenaPokemon = []
    
        useEffect(() => {
            localStorageArenaPokemon = localStorage.getItem("arenaPokemons");
            localStorageArenaPokemon = JSON.parse(localStorageArenaPokemon)
            if(localStorageArenaPokemon) { 
            setpokemonArenaID(localStorageArenaPokemon)
            if (localStorageArenaPokemon.length === 2) {
                setisBothPokemon(true);
            } }
          }, [favorites]);
    
    

         const setshowCardDetails = () => {

         }

         const handleFightButton = () => {
            if(isBothPokemon) {

            console.log("STAT 1",pokemon1Stats)
            console.log("STAT 2",pokemon2Stats)

            if (pokemon1Stats === pokemon2Stats)
            {
                console.log("REMIS")
            } else if (pokemon1Stats > pokemon2Stats )
            {
                console.log("1")
            } else {
                console.log("2")
            }

            } 
         }
    
      return (
        <>
        <Typography> 
        {isBothPokemon ? "YES" : "NON"}
        </Typography>
    <Box sx={{display:"flex",justifyContent: "center", flexWrap: "wrap", alignContent: "center", flexDirection: {xs: "column", md: "row"}}}> 

    {pokemonArenaID[0] ? <ArenaCard showCardDetails={true} setshowCardDetails={setshowCardDetails} cardID={pokemonArenaID[0]} arena={true} setpokemonStats={setpokemon1Stats} setpokemonArenaID={setpokemonArenaID}  /> : 
    <Box sx={{width: "300px", height: "500px", bgcolor: "grey", borderRadius: "10px"}}> Dodaj 1 pokemona </Box>}
    <Button sx={{m: 2, borderRadius: "58px", border: 2, height: "28px", width: "28px", p: 5, alignSelf: "center"}}onClick={handleFightButton}>Fight</Button>

    {pokemonArenaID[1] ? <ArenaCard showCardDetails={true} setshowCardDetails={setshowCardDetails} cardID={pokemonArenaID[1]} arena={true} setpokemonStats={setpokemon2Stats} setpokemonArenaID={setpokemonArenaID} /> : 
    <Box sx={{width: "300px", height: "500px", bgcolor: "grey", borderRadius: "10px"}}> Dodaj 2 pokemona </Box>}

</Box>


        </>
  )
}

export default Arena