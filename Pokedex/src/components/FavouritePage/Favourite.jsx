import { Typography, Grid, Pagination, } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { FavoriteContext } from "../Global/FavoriteContext";
import PokemonCard from '../MainPage/PokemonCard';
import PokemonDetails from '../MainPage/PokemonDetails';
function Favourite() {

const [isAnyFavorite, setisAnyFavorite] = useState(false);
const [FetchedFavorites, setFetchedFavorites] = useState([]);
const [idOfClickedElem, setidOfClickedElem] = useState(0);

const { favorites, toggleFavorite } = useContext(FavoriteContext);
const [showCardDetails, setshowCardDetails] = useState(false);

const BASE_URL = "https://pokeapi.co/api/v2/";
const searchQuery = "pokemon/";
const searchPath = `${BASE_URL}${searchQuery}`;

let classOfClickedElem;
let localStorageFavorites = []

    useEffect(() => {
         localStorageFavorites = localStorage.getItem("favorites");
         localStorageFavorites = JSON.parse(localStorageFavorites)
        if (localStorageFavorites) {
          setisAnyFavorite(true);
        }
      }, [favorites]);

      useEffect(() => {
        const fetchData = async () => {
            const fetchedData = [];

            for (const favoriteId of localStorageFavorites) {
                console.log(favoriteId)
                const response = await fetch(`${searchPath}${favoriteId}`);
                const data = await response.json();
                fetchedData.push(data);
                console.log(fetchedData)
              }

              const updatedPokemons = JSON.parse(localStorage.getItem("updatedPokemons")) || []
      
              let updatedDataDetails = fetchedData.map((pokemon) => {
                const pokemonInUpdatedPokemons = updatedPokemons.find((item) => item.id === pokemon.id);
               
        
                return pokemonInUpdatedPokemons ? pokemonInUpdatedPokemons : pokemon;
              });
              
             
        
              
        
             
        
              setFetchedFavorites(updatedDataDetails);



               
        };
        fetchData();
      }, [favorites]);


      const ArrowClickHandle = (keyValue, nameOfClass) => {
        setidOfClickedElem(keyValue)
        console.log(keyValue,"ID");

        classOfClickedElem = nameOfClass;
        setshowCardDetails(true);
        
      }

  return (
    <>
    <Container > 
    <Typography> 
    {isAnyFavorite ? "Exist" : "NON"}
    </Typography>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}  >

    {FetchedFavorites.map((item) => (
<Grid item xs={2} sm={4} md={4} key={item.id}  sx={{display:"flex", justifyContent: "center"}}>

    <PokemonCard item={item} onArrowClick={ArrowClickHandle}/></Grid>
   ))}
    </Grid>



{showCardDetails && <PokemonDetails showCardDetails={showCardDetails} setshowCardDetails={setshowCardDetails} cardID={idOfClickedElem} class={classOfClickedElem} />}
</Container>
    </>
  )
}

export default Favourite