import React, { useState } from "react";
import { DetailedPokemonCard, DetailedPokemonCardConatiner } from "../components";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { deleteData, postData } from "src/api";
import { useOutletContext } from "react-router-dom";
import { fetchPokemonData } from "src/api";
const DetailedPage = () => {
  const [
    arenaFirstFighter,
    setArenaFirstFighter,
    arenaSecondFighter,
    setArenaSecondFighter,
    favoriteList,
    setFavoriteList,
  ] = useOutletContext();
  const { name } = useParams();
  const queryClient = useQueryClient();
  const { data: detailPokemon } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${name}`),
    staleTime: 10 * (60 * 1000),
  });
  const [isFavorite, setIsFavorite] = useState(favoriteList?.includes(name) ? true : false);
  const createPostMutation = useMutation({
    mutationFn: () => postData("favorite", detailPokemon),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorite"]);
    },
  });
  const createDeleteMutation = useMutation({
    mutationFn: () => deleteData(name),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorite"]);
    },
  });
  const addFavorite = () => {
    setIsFavorite((prev) => !prev);
    setFavoriteList((prev) => prev.push(name));
    createPostMutation.mutate();
  };
  const deleteFavorite = () => {
    setIsFavorite((prev) => !prev);
    setFavoriteList((prev) => prev?.filter((value) => value !== name));
    createDeleteMutation.mutate();
  };
  const arenaFightersHandle = () => {
    !arenaFirstFighter
      ? setArenaFirstFighter(name)
      : !arenaSecondFighter && arenaFirstFighter !== name && setArenaSecondFighter(name);
  };
  return (
    <DetailedPokemonCardConatiner>
      {detailPokemon && (
        <DetailedPokemonCard
          value={detailPokemon}
          onClickFavorite={!isFavorite ? addFavorite : deleteFavorite}
          onClickArena={arenaFightersHandle}
          isFavorite={isFavorite}
          myName={name}
          firstFighterProp={arenaFirstFighter}
          secondFighterProp={arenaSecondFighter}
        />
      )}
    </DetailedPokemonCardConatiner>
  );
};

export default DetailedPage;
