import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [pokesData, setPokesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const pokemonList = response.data.results;
        const pokemonData = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return res.data;
          })
        );

        const fetchedData = await axios.get(
          "http://localhost:4100/pokemonData"
        );

        const mergedData = mergeData(fetchedData.data, pokemonData);
        setPokesData(mergedData);
      } catch (error) {
        console.log("Error fetching pokemon data:", error);
      }
    };

    fetchData();
  }, [pokesData]);

  function mergeData(pokeData, pokesData) {
    return pokesData.map((poke) => {
      const matchingPoke = pokeData.find((p) => p.id === poke.id);
      if (poke.new === true) {
        return { ...poke, wins: 0, loses: 0 };
      } else if (matchingPoke) {
        return matchingPoke;
      } else {
        return { ...poke, wins: 0, loses: 0 };
      }
    });
  }

  return (
    <AppContext.Provider value={{ pokesData }}>{children}</AppContext.Provider>
  );
};
