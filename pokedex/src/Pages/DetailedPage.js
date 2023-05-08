import React, { useState } from "react";
import { DetailedPokemonCard, DetailedPokemonCardConatiner } from "./components";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchPokemonData, postData } from "src/api";
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
  console.log({ detailPokemon });
  const createDataMutation = useMutation({
    mutationFn: () => postData(detailPokemon.data, id),
  });
  const addFavorite = () => {
    setIsFavorite((prev) => !prev);
    setFavoriteProp((prev) => [...prev, id]);
    createDataMutation.mutate();
  };
  const deleteFavorite = () => {
    setIsFavorite((prev) => !prev);
    setFavoriteProp((prev) => prev.filter((value) => value !== id));
  };
  const arenaFightersHandle = () => {
    setInArena((prev) => !prev);
    !firstFighterProp
      ? setFirstFighterProp(id)
      : !secondFighterProp && firstFighterProp !== id && setSecondFighterProp(id);
  };
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
