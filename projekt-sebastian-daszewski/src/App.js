import './App.css';
import * as React from 'react';
import DrawerAppBar from './Components/DrawerAppBar';
import Input from '@mui/material/Input';
import Card from "./Components/Card";
import Pokeinfo from "./Components/PokeInfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";




function App() {



const [pokeData,setPokeData]=useState([]);
const [loading,setLoading]=useState(true);
const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
const [nextUrl,setNextUrl]=useState();
const [prevUrl,setPrevUrl]=useState();
const [pokeDex,setPokeDex]=useState();
const [currentPage, setCurrentPage] = useState(1);

const limit = 15;
const offset = (currentPage - 1) * limit;

const pokeFun=async()=>{
    setLoading(true)
    const res=await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results)
    setLoading(false)
}
const getPokemon=async(res)=>{
   res.map(async(item)=>{
      const result=await axios.get(item.url)
      setPokeData(state=>{
          state=[...state,result.data]
          state.sort((a,b)=>a.id>b.id?1:-1)
          return state;
      })
   })   
}
useState(() => {
  pokeFun();
}, [url]);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
    const pokemonList = res.data.results;
    const pokemonData = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return response.data;
      })
    );
    setPokeData(pokemonData);
    setLoading(false);
  };
  fetchData();
}, [currentPage]);

const handlePrevPage = () => {
  setCurrentPage(currentPage - 1);
};

const handleNextPage = () => {
  setCurrentPage(currentPage + 1);
};
return (
  <>
    <div>
      <DrawerAppBar />
      <div className='search'>
        <Input placeholder='Search' />
      </div>
    </div>
    <div className="container">
      <div className="left-content">
        <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />

        <div className="btn-group">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <button onClick={handleNextPage} disabled={currentPage}>Next</button>
          <div>Current page: {currentPage}</div>
        </div>
      </div>

    </div>
    <div className="right-content">
      <Pokeinfo data={pokeDex} />
    </div>
  </>
);
}

export default App;
