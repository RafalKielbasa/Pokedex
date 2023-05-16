import React, { useState } from "react";
import { DetailedPokemonCard, DetailedPokemonCardConatiner } from "../components";
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
  pokemonQueries,
}) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isFavorite, setIsFavorite] = useState(favoriteProp?.includes(id) ? true : false);
  const detailPokemon = pokemonQueries?.filter(({ data }) => Number(data?.data?.id) === Number(id));
  const createPostMutation = useMutation({
    mutationFn: () => postData("favorite", detailPokemon[0]?.data?.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorite"]);
    },
  });
  const createDeleteMutation = useMutation({
    mutationFn: () => deleteData(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorite"]);
    },
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
      : !secondFighterProp && firstFighterProp !== id && setSecondFighterProp(id);
  };
  return (
    <DetailedPokemonCardConatiner>
      {detailPokemon[0] && (
        <DetailedPokemonCard
          value={detailPokemon[0]?.data?.data}
          onClickFavorite={!isFavorite ? addFavorite : deleteFavorite}
          onClickArena={arenaFightersHandle}
          isFavorite={isFavorite}
          myName={id}
          firstFighterProp={firstFighterProp}
          secondFighterProp={secondFighterProp}
        />
      )}
    </DetailedPokemonCardConatiner>
  );
};

export default DetailedPage;
