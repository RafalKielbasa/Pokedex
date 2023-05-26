import React from "react";
import styled from "styled-components";
import PokemonCard from "../Components/PokemonCards";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getFavorites } from "src/api/source";
import useLogic from "./HomePage";

const PokemonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ArenaPage = () => {
  const queryFavoritesData = useQuery(["arena"], () => getFavorites());
  const { data } = queryFavoritesData;
  const favorites = data?.data;
  const favoritesIds = favorites?.map((item) => item.id);
  // const { resultUrl } = useLogic();
  // console.log(`resultUrl`, resultUrl);
  console.log(`favorites`, favorites);
  // const test = queryFullData?.data?.toSpliced(0, 1);
  // console.log(`test`, test);

  return (
    <PokemonWrapper>
      {data?.data?.map((item, index) => (
        <PokemonCard
          key={index}
          id={item.id}
          pic={item.pic}
          picDet={item.picDet}
          name={item.name}
          height={item.height}
          baseexp={item.baseexp}
          weight={item.weight}
          abilitie={item.abilitie}
          favorites={favorites}
          favoritesIds={favoritesIds}
          // fullPokemonData={fullPokemonData}
          // partialPokemonData={partialPokemonData}
          // fullPokemonDataFiltered={fullPokemonDataFiltered}
          // favorites={favorites}
          // favoritesIds={favoritesIds}
        />
      ))}
    </PokemonWrapper>
  );
};
export default ArenaPage;
