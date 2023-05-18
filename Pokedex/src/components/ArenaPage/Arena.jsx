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

    let localStorageArenaPokemon = []
    
        useEffect(() => {

            localStorageArenaPokemon = JSON.parse((localStorage.getItem("arenaPokemons")) || []);

            if(localStorageArenaPokemon) { 
            setpokemonArenaID(localStorageArenaPokemon)
            if (localStorageArenaPokemon.length === 2) {

                setisBothPokemon(true);
            } }
          }, [isFight]);
    
    
    

         const setshowCardDetails = () => {

         }

         const handleDeleteButton = (index) => {
            const filteredIds = pokemonArenaID.filter(id => id !== index);
            console.log("TEST",filteredIds)
            setpokemonArenaID(filteredIds);
            localStorage.setItem("arenaPokemons", JSON.stringify(filteredIds));
            setisFight(false)
          };

         const handleFightButton = () => {

            setisFight(true)
            let winnerPokemonId;


            if (pokemon1Stats === pokemon2Stats)
            {
                console.log("REMIS")
            } else if (pokemon1Stats > pokemon2Stats )
            {
                console.log("WYGRAL 1")
                setIsWinner1(true);
                winnerPokemonId = pokemonArenaID[0];


            } else {
                console.log("WYGRAL 2")
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
          
                localStorage.setItem("arenaResults",JSON.stringify(winsByPokemon));
              }


              setisBothPokemon(false)

         }
    
      return (
        <>
  
    {pokemonArenaID && <Box sx={{display:"flex",justifyContent: "center", flexWrap: "wrap", alignContent: "center", flexDirection: {xs: "column", md: "row"}}}> 

    {pokemonArenaID[0] ? <ArenaCard  cardID={pokemonArenaID[0]} arena={true} setpokemonStats={setpokemon1Stats} isWinner={isWinner1} setpokemonArenaID={setpokemonArenaID} setIsWinner={setIsWinner1} isFight={isFight} setisFight={setisFight} onDeleteButton={() => handleDeleteButton(pokemonArenaID[0], 0) } pokemonArenaID={pokemonArenaID} setisBothPokemon={setisBothPokemon} 
 /> : 
 <Box sx={{width: "300px", height: "600px", bgcolor: "grey", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center"}}><Typography sx={{fontWeight: 700}}>Dodaj 1 pokemona</Typography>  </Box>}
    <Button sx={{m: 2, borderRadius: "58px", border: 2, height: "28px", width: "28px", p: 5, alignSelf: "center"}} onClick={handleFightButton} disabled={!isBothPokemon}>Fight</Button>

    {pokemonArenaID[1] ? <ArenaCard cardID={pokemonArenaID[1]} arena={true} setpokemonStats={setpokemon2Stats} isWinner={isWinner2} setpokemonArenaID={setpokemonArenaID} setIsWinner={setIsWinner2} isFight={isFight} setisFight={setisFight} onDeleteButton={() => handleDeleteButton(pokemonArenaID[1], 1)} pokemonArenaID={pokemonArenaID} setisBothPokemon={setisBothPokemon} /> : 
    <Box sx={{width: "300px", height: "600px", bgcolor: "grey", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center"}}><Typography sx={{fontWeight: 700}}>Dodaj 2 pokemona</Typography>  </Box>}

</Box>}


        </>
  )
}

export default Arena