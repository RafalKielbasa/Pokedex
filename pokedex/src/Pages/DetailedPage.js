import React, { useState } from "react";
import {
  DetailedPokemonCard,
  DetailedPokemonCardConatiner,
} from "./components";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteData, postData } from "src/api";
const DetailedPage = ({
  firstFighterProp,
  secondFighterProp,
  setFirstFighterProp,
  setSecondFighterProp,
  favoriteProp,
  setFavoriteProp,
}) => {
  const { name } = useParams();
  const [isFavorite, setIsFavorite] = useState(
    favoriteProp?.includes(name) ? true : false
  );
  const queryClient = useQueryClient();
  const detailPokemon = queryClient.getQueryData(["pokemon", name]);
  const createPostMutation = useMutation({
    mutationFn: () => postData("favorite", detailPokemon.data, name),
  });
  const createDeleteMutation = useMutation({
    mutationFn: () => deleteData(name),
  });
  const addFavorite = () => {
    setIsFavorite((prev) => !prev);
    setFavoriteProp((prev) => [...prev, name]);
    createPostMutation.mutate();
  };
  const deleteFavorite = () => {
    setIsFavorite((prev) => !prev);
    setFavoriteProp((prev) => prev?.filter((value) => value !== name));
    createDeleteMutation.mutate();
  };
  const arenaFightersHandle = () => {
    !firstFighterProp
      ? setFirstFighterProp(name)
      : !secondFighterProp &&
        firstFighterProp !== name &&
        setSecondFighterProp(name);
  };
  return (
    <DetailedPokemonCardConatiner>
      <DetailedPokemonCard
        value={detailPokemon}
        onClickFavorite={!isFavorite ? addFavorite : deleteFavorite}
        onClickArena={arenaFightersHandle}
        isFavorite={isFavorite}
        myName={name}
        firstFighterProp={firstFighterProp}
        secondFighterProp={secondFighterProp}
      />
    </DetailedPokemonCardConatiner>
  );
};

export default DetailedPage;
