import { Typography, Grid, Pagination, } from '@mui/material';
import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { FavoriteContext } from "../Global/FavoriteContext";
import PokemonCard from '../MainPage/PokemonCard';

function Favourite() {

const [isAnyFavorite, setisAnyFavorite] = useState(false);
const [FetchedFavorites, setFetchedFavorites] = useState([]);
const { favorites, toggleFavorite } = useContext(FavoriteContext);
const BASE_URL = "https://pokeapi.co/api/v2/";
const searchQuery = "pokemon/";
const searchPath = `${BASE_URL}${searchQuery}`;
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
                console.log(fetchData)
              }
              setFetchedFavorites(fetchedData); 
        };
        fetchData();
      }, [favorites]);

  return (
    <>
    <Typography> 
    {isAnyFavorite ? "Exist" : "NON"}
    </Typography>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}  >

    {FetchedFavorites.map((item) => (
<Grid item xs={2} sm={4} md={4} key={item.id}  sx={{display:"flex", justifyContent: "center"}}>

    <PokemonCard item={item} /></Grid>
   ))}
    </Grid>

{/* <Pagination count={Math.ceil(filteredData.length / cardsPerPage)} page={page} onChange={(event, value) => setPage(value)} sx={{ display: 'flex', justifyContent: 'center', my: 3 }} /> */}

{/* 
{showCardDetails && <PokemonDetails showCardDetails={showCardDetails} setshowCardDetails={setshowCardDetails} cardID={idOfClickedElem} class={classOfClickedElem} />} */}

    </>
  )
}

export default Favourite