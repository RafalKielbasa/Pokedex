import React from 'react'
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { v4 as uuidv4 } from 'uuid';
// import { makeStyles } from '@mui/styles';

import { Paper, Box } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import '../../app.css'
import  logo  from '../../assets/LOGO_POKEAPI.png'
import SingleCard from './SingleCard';

function CardPage() {

  const [fetchedData, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const newNumbers = [];
  const [matched, setMatched] = useState([]);
  const [openedCard, setOpenedCard] = useState([]);

  let storeID = 0;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0");
      const data = await response.json();
      const dataDetails = await Promise.all(data.results.map(async (v) => {
        const vDetails = await fetch(v.url);
        return await vDetails.json();
      }));
      setData(dataDetails);
    };
    
    fetchData();
    generateNumbers();

  }, []);
  
  useEffect(() => {
    const mergedData = fetchedData.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites.front_default,
      abilities: pokemon.abilities,
    
    }));

    const data = mergedData.filter(pokemon => numbers.includes(pokemon.id));
    let pairOfPokemons = [...data, ...data]
    .sort(() => Math.random() - 0.5)
    .map(
      (pokemon, index) => ({
        number: index,
        ...pokemon,
      })
    )
  
    setFilteredData(pairOfPokemons);
  }, [fetchedData]);


  useEffect(() => {
    if (openedCard < 2) return;

    const firstMatched = filteredData[openedCard[0]];
    const secondMatched = filteredData[openedCard[1]];

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched([...matched, firstMatched.number, secondMatched.number]);
    }
    console.log("FIRST", firstMatched);
    console.log("s", secondMatched);
      setTimeout(() => console.log("MATCHED",matched), 1000)
      console.log("ff", filteredData);

    if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
  }, [openedCard]);


    function generateNumbers() {
    
      setNumbers([]);
      const newNumbers = [];
      for (let i = 0; i < 10; i++) {
        newNumbers.push(Math.floor(Math.random() * 150) + 1);
      }
      setNumbers(newNumbers);
      console.log("NUMBERS", newNumbers)
    }
    

    function handleCardClick(number) {
      console.log("CCC", number)
      const index = filteredData.findIndex(pokemon => pokemon.number === number);
      if (openedCard.includes(filteredData[index].number) || matched.includes(filteredData[index].number)) {
        return;
      }
    
    
      setOpenedCard((opened) => [...opened, filteredData[index].number]);
    }

  return (
    <> 

<Container>
  <Grid container rowSpacing={2} columnSpacing={2} sx={{ p: 10 }}>
    {filteredData.map((pokemon) => {
      const isFlipped = openedCard.includes(pokemon.number) || matched.includes(pokemon.number);


      return (
        <Grid item xs={3} key={uuidv4()}>
          <SingleCard pokemonNumber={pokemon.number} isFlipped={isFlipped} handleCardClick={handleCardClick} pokemonPhoto = {pokemon.sprites}/>
        </Grid>
      );
    })}
  </Grid>
</Container>






    </>
  )
}

export default CardPage