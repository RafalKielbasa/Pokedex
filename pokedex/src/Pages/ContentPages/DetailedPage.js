import React, { useEffect, useState } from "react";

import { useParams, useOutletContext } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import {
  DetailedPokemonCard,
  DetailedPokemonCardConatiner,
  BasicPokemonLayout,
  Loader,
  ErrorMsg,
} from "src/components";
import { fetchOnePokemon } from "src/api/fetchDataFunctions";
import { postData } from "src/api/postDataFunctions";
import { deleteData } from "src/api/deleteData";

const DetailedPage = () => {
  const {
    arenaFirstFighter,
    setArenaFirstFighter,
    arenaSecondFighter,
    setArenaSecondFighter,
    favoriteList,
    editedStatus,
    editedList,
    favoriteStatus,
  } = useOutletContext();

  const { name } = useParams();
  const queryClient = useQueryClient();
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    Array.isArray(favoriteList) && favoriteList?.includes(name) && setIsFavorite(true);
  }, [favoriteList, name]);

  const {
    data: detailPokemon,
    status,
    error,
  } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchOnePokemon(editedList, name),
    enabled: editedStatus === "success" && favoriteStatus === "success",
    staleTime: 10 * (60 * 1000),
  });

  const createPostMutation = useMutation({
    mutationFn: () => postData("favorite", detailPokemon?.name),
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
    createPostMutation.mutate();
  };
  const deleteFavorite = () => {
    setIsFavorite((prev) => !prev);
    createDeleteMutation.mutate();
  };

  const arenaFightersHandle = () => {
    !arenaFirstFighter
      ? setArenaFirstFighter(name)
      : !arenaSecondFighter && arenaFirstFighter !== name && setArenaSecondFighter(name);
  };
  if (status === "loading") return <Loader />;
  if (status === "error") return <ErrorMsg errorMsg={error.message} />;
  return (
    <BasicPokemonLayout>
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
    </BasicPokemonLayout>
  );
};

export default DetailedPage;
