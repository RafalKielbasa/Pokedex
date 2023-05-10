import React, { useState } from "react";
import {
  DetailedPokemonCard,
  DetailedPokemonCardConatiner,
} from "./components";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteData, fetchPokemonData, postData } from "src/api";
const DetailedPage = ({
  firstFighterProp,
  secondFighterProp,
  setFirstFighterProp,
  setSecondFighterProp,
  favoriteProp,
  setFavoriteProp,
}) => {
  const { id } = useParams();
  const { state } = useLocation();
  const [isFavorite, setIsFavorite] = useState(
    favoriteProp?.includes(id) ? true : false
  );
  const { data: detailPokemon, status: pokemonStatus } = useQuery({
    queryKey: ["pokemon", state],
    queryFn: () => fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}`),
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  const createPostMutation = useMutation({
    mutationFn: () => postData(detailPokemon.data, id),
  });
  const createDeleteMutation = useMutation({
    mutationFn: () => deleteData(id),
  });
  const addFavorite = () => {
    setIsFavorite((prev) => !prev);
    setFavoriteProp((prev) => [...prev, id]);
    createPostMutation.mutate();
  };
  const deleteFavorite = () => {
    setIsFavorite((prev) => !prev);
    setFavoriteProp((prev) => prev?.filter((value) => value !== id));
    createDeleteMutation.mutate();
  };
  const arenaFightersHandle = () => {
    !firstFighterProp
      ? setFirstFighterProp(id)
      : !secondFighterProp &&
        firstFighterProp !== id &&
        setSecondFighterProp(id);
  };
  return (
    <DetailedPokemonCardConatiner>
      {pokemonStatus === "success" && (
        <DetailedPokemonCard
          value={detailPokemon}
          onClickFavorite={!isFavorite ? addFavorite : deleteFavorite}
          onClickArena={arenaFightersHandle}
          isFavorite={isFavorite}
          myId={id}
          firstFighterProp={firstFighterProp}
          secondFighterProp={secondFighterProp}
        />
      )}
    </DetailedPokemonCardConatiner>
  );
};

export default DetailedPage;
