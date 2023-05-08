import React, { useState } from "react";
import {
  DetailedPokemonCard,
  DetailedPokemonCardConatiner,
} from "./components";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonData } from "src/api";
const DetailedPage = ({
  firstFighterProp,
  secondFighterProp,
  setFirstFighterProp,
  setSecondFighterProp,
  favoriteProp,
  setFavoriteProp,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [inArena, setInArena] = useState(false);
  const { id } = useParams();
  const { state } = useLocation();
  const { data: detailPokemon, status: pokemonStatus } = useQuery({
    queryKey: ["pokemon", state],
    queryFn: () => fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}`),
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  const addFavorite = () => {
    setIsFavorite((prev) => !prev);
    setFavoriteProp((prev) => [...prev, id]);
  };
  const deleteFavorite = () => {
    setIsFavorite((prev) => !prev);
    setFavoriteProp((prev) => prev.filter((value) => value !== id));
  };
  const arenaFightersHandle = () => {
    setInArena((prev) => !prev);
    !firstFighterProp
      ? setFirstFighterProp(id)
      : !secondFighterProp &&
        firstFighterProp !== id &&
        setSecondFighterProp(id);
  };
  console.log({ firstFighterProp, secondFighterProp });
  return (
    <DetailedPokemonCardConatiner>
      {pokemonStatus === "success" && (
        <DetailedPokemonCard
          value={detailPokemon}
          onClickFavorite={!isFavorite ? addFavorite : deleteFavorite}
          onClickArena={arenaFightersHandle}
          isFavorite={isFavorite}
          inArena={inArena}
          firstFighterProp={firstFighterProp}
          secondFighterProp={secondFighterProp}
        />
      )}
    </DetailedPokemonCardConatiner>
  );
};

export default DetailedPage;
