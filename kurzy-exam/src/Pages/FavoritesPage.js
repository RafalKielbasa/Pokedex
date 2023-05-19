import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { getFavorites } from "src/api/source";
import { useLogic } from "src/Pages/HomePage";

const FavoritesPage = () => {
  const queryFavoritesData = useQuery(["favorites"], () => getFavorites());

  // const { data } = queryFavoritesData;

  // console.log(`data`, data);

  // const pokemonDataFiltered = fullPokemonData.filter((item) => item.id === id);

  return <div>FavoritesPage</div>;
};
export default FavoritesPage;
