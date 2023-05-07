import React from 'react'
import { Typography, Grid, Pagination, Box, Button} from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { FavoriteContext } from "../Global/FavoriteContext";
import PokemonCard from '../MainPage/PokemonCard';
import PokemonDetails from '../MainPage/PokemonDetails';
import ArenaCard from './ArenaCard';
function Arena() {

    const [isBothPokemon, setisBothPokemon] = useState(false);
    const [pokemonArenaID, setpokemonArenaID] = useState([]);
    const { favorites, toggleFavorite } = useContext(FavoriteContext);
    const [pokemon1Stats, setpokemon1Stats] = useState();
    const [pokemon2Stats, setpokemon2Stats] = useState();
    const [isWinner1, setIsWinner1] = useState(false);
    const [isWinner2, setIsWinner2] = useState(false);
    const [isFight, setisFight] = useState(false);
    const [refresh, setRefresh] = useState(false);

    let localStorageArenaPokemon = []
    
        useEffect(() => {
            console.log(isBothPokemon,"TEEET")
            console.log(isWinner1,"TEEET")
            console.log(isWinner2,"TEEET")
            localStorageArenaPokemon = localStorage.getItem("arenaPokemons");
            localStorageArenaPokemon = JSON.parse(localStorageArenaPokemon)
            if(localStorageArenaPokemon) { 
            setpokemonArenaID(localStorageArenaPokemon)
            if (localStorageArenaPokemon.length === 2) {
                setisBothPokemon(true);
            } }
            console.log("POK",pokemonArenaID)
          }, [favorites,refresh]);
    

     
    

         const setshowCardDetails = () => {

         }

         const handleDeleteButton = (index) => {
             
            setpokemonArenaID((prevPokemonArenaID) =>
              prevPokemonArenaID.filter((id) => id !== index)
            );
            localStorage.setItem(
              "arenaPokemons",
              JSON.stringify(
                pokemonArenaID.filter((id) => id !== index)
              )
            );
            setRefresh(!refresh)
          };

         const handleFightButton = () => {
            if(isBothPokemon) {
                setisFight(true)
                let winnerPokemonId;


            if (pokemon1Stats === pokemon2Stats)
            {
                console.log("REMIS")
            } else if (pokemon1Stats > pokemon2Stats )
            {
                console.log("1")
                setIsWinner1(true);
                winnerPokemonId = pokemonArenaID[0];


            } else {
                console.log("2")
                setIsWinner2(true);
                winnerPokemonId = pokemonArenaID[1];


            }

            if (winnerPokemonId) {
                const lsArenaResults = localStorage.getItem("arenaResults");
                let winsByPokemon = {};
                if (lsArenaResults) {
                  winsByPokemon = JSON.parse(lsArenaResults);
                }
          
                if (winnerPokemonId in winsByPokemon) {
                  winsByPokemon[winnerPokemonId] += 1;
                } else {
                  winsByPokemon[winnerPokemonId] = 1;
                }
          
                localStorage.setItem(
                  "arenaResults",
                  JSON.stringify(winsByPokemon)
                );
              }



            } 


      
         }
    
      return (
        <>
        <Typography> 
        {isBothPokemon ? "YES" : "NON"}
        </Typography>
    <Box sx={{display:"flex",justifyContent: "center", flexWrap: "wrap", alignContent: "center", flexDirection: {xs: "column", md: "row"}}}> 

    {pokemonArenaID[0] ? <ArenaCard showCardDetails={true} setshowCardDetails={setshowCardDetails} cardID={pokemonArenaID[0]} arena={true} setpokemonStats={setpokemon1Stats} isWinner={isWinner1} setpokemonArenaID={setpokemonArenaID} setIsWinner={setIsWinner1} isFight={isFight} setisFight={setisFight} onDeleteButton={() => handleDeleteButton(pokemonArenaID[0], 0) } pokemonArenaID={pokemonArenaID}
 /> : 
    <Box sx={{width: "300px", height: "500px", bgcolor: "grey", borderRadius: "10px"}}> Dodaj 1 pokemona </Box>}
    <Button sx={{m: 2, borderRadius: "58px", border: 2, height: "28px", width: "28px", p: 5, alignSelf: "center"}} onClick={handleFightButton} >Fight</Button>

    {pokemonArenaID[1] ? <ArenaCard showCardDetails={true} setshowCardDetails={setshowCardDetails} cardID={pokemonArenaID[1]} arena={true} setpokemonStats={setpokemon2Stats} isWinner={isWinner2} setpokemonArenaID={setpokemonArenaID} setIsWinner={setIsWinner2} isFight={isFight} setisFight={setisFight} onDeleteButton={() => handleDeleteButton(pokemonArenaID[1], 1)} pokemonArenaID={pokemonArenaID}/> : 
    <Box sx={{width: "300px", height: "500px", bgcolor: "grey", borderRadius: "10px"}}> Dodaj 2 pokemona </Box>}

</Box>


        </>
  )
}

export default Arena