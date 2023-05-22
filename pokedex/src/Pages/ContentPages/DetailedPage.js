import React, { useEffect, useState } from "react";
import {
  DetailedPokemonCard,
  DetailedPokemonCardConatiner,
  BasicPokemonLayout,
} from "../components";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { fetchOnePokemon } from "src/api/fetchDataFunctions";
import { postData } from "src/api/postDataFunctions";
import { deleteData } from "src/api/deleteData";
import { useOutletContext } from "react-router-dom";
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
  const { data: detailPokemon } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchOnePokemon(editedList, name),
    enabled: editedStatus === "success" && favoriteStatus === "success",
    staleTime: 10 * (60 * 1000),
  });
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    Array.isArray(favoriteList) &&
      favoriteList?.includes(name) &&
      setIsFavorite(true);
  }, [favoriteList, name]);
  const createPostMutation = useMutation({
    mutationFn: () => postData("favorite", detailPokemon?.name),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorite"]);
    },
  });
  const addFavorite = () => {
    setIsFavorite((prev) => !prev);
    createPostMutation.mutate();
  };

  const createDeleteMutation = useMutation({
    mutationFn: () => deleteData(name),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorite"]);
    },
  });
  const deleteFavorite = () => {
    setIsFavorite((prev) => !prev);
    createDeleteMutation.mutate();
  };
  const arenaFightersHandle = () => {
    !arenaFirstFighter
      ? setArenaFirstFighter(name)
      : !arenaSecondFighter &&
        arenaFirstFighter !== name &&
        setArenaSecondFighter(name);
  };
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
