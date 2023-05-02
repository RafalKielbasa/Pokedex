import React from 'react'
import { useEffect, useState} from 'react'
import {
    Typography,
    Box,
    Container,
    IconButton,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Pagination,
    Button,
  } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PokemonDetails from './PokemonDetails'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PokemonCard from './PokemonCard'
import '../../App.css'
const BASE_URL = "https://pokeapi.co/api/v2/";
const searchQuery = "pokemon?limit=150&offset=0";
const searchPath = `${BASE_URL}${searchQuery}`;

let idOfClickedElem = 0;
let classOfClickedElem;



function PokemonCarousel() {
const [fetchedData, setData] = useState([]);
let [filteredData, setFilteredData] = useState([]);
const [showCardDetails, setshowCardDetails] = useState(false);
const [page, setPage] = useState(1);
const [cardsPerPage, setCardsPerPage] = useState(9);

const types = ["ALL", "FIRE", "WATER", "BUG", "NORMAL", "POISON", "ELECTRIC", "GROUND", "GRASS", "FIGHTING", "ROCK", "GHOST", "DRAGON", "PSYCHIC"];

const startIndex = (page - 1) * cardsPerPage;
const endIndex = startIndex + cardsPerPage;
const currentData = filteredData.slice(startIndex, endIndex);

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(searchPath);
    const data = await response.json();
    const dataDetails = await Promise.all(data.results.map(async (v) => { 
      const vDetails = await fetch(v.url);
      return await vDetails.json();
    }));
    setData(dataDetails);
    setFilteredData(dataDetails);
  };
  fetchData();
}, []);

const filterClickHandle = (e) => {
  const clickedTextBtn = e.target.textContent.toLowerCase();
  if (clickedTextBtn === 'all') {
    setFilteredData(fetchedData)
  } else { 
    const filteredData = fetchedData.filter((item) => item.types[0].type.name === `${clickedTextBtn}`);
    setFilteredData(filteredData);
  }
  setPage(1); 
}

  const ArrowClickHandle = (keyValue, nameOfClass) => {
    console.log(keyValue);
    idOfClickedElem = keyValue;
    classOfClickedElem = nameOfClass;
    setshowCardDetails(true);
    
  }
  const cardClickHandle = (id) => {
    
    
  }

  
  return (
    <Box sx={{backgroundColor: '#f7f6f6'}}>

    <Container sx={{boxSizing: "border-box", p: 1}}>
    <Box sx={{marginBottom: 2}}> 
      <Typography sx={{width: "100%", textAlign: "center", py:3, fontWeight: 700, fontSize: "39px"}}>OUR POKEMON PORTFOLIO</Typography>
      {types.map((v) => {
        return <Button key={v} variant="outlined" onClick={filterClickHandle}  sx={{borderRadius: "10px", border: 2, m: "5px", fontWeight: 700, color: "#272D34"}}>{v}</Button>
      })}
 
  
    </Box>


    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}  >
{currentData.map((item) => (
<Grid item xs={2} sm={4} md={4} key={item.id}  sx={{display:"flex", justifyContent: "center"}}>

    <PokemonCard item={item} onArrowClick={ArrowClickHandle} /></Grid>
   ))}
</Grid>

<Pagination count={Math.ceil(filteredData.length / cardsPerPage)} page={page} onChange={(event, value) => setPage(value)} sx={{ display: 'flex', justifyContent: 'center', my: 3 }} />


{showCardDetails && <PokemonDetails showCardDetails={showCardDetails} setshowCardDetails={setshowCardDetails} cardID={idOfClickedElem} class={classOfClickedElem} />}
</Container></Box>
  )
}

export default PokemonCarousel





