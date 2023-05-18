import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchEditedList, fetchFavorite } from "src/api";
const MainPage = () => {
  const { data: editedList, status: editedStatus } = useQuery({
    queryKey: ["editedPokemons"],
    queryFn: () => fetchEditedList(),
    staleTime: 10 * (60 * 1000),
  });
  const { data: favorite, status: favoriteStatus } = useQuery({
    queryKey: ["favorite"],
    queryFn: () => fetchFavorite(),
    staleTime: 10 * (60 * 1000),
  });
  const [arenaFirstFighter, setArenaFirstFighter] = useState(null);
  const [arenaSecondFighter, setArenaSecondFighter] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);
  const [page, setPage] = useState(1);
  const [searchedValue, setSearchedValue] = useState("");
  useEffect(() => {
    favoriteStatus === "success" && setFavoriteList(favorite);
  }, [favoriteStatus, favorite]);
  return (
    <>
      <Navigation />
      <Outlet
        context={{
          page,
          setPage,
          searchedValue,
          setSearchedValue,
          arenaFirstFighter,
          setArenaFirstFighter,
          arenaSecondFighter,
          setArenaSecondFighter,
          favoriteList,
          setFavoriteList,
          editedList,
          editedStatus,
          favoriteStatus,
        }}
      />
    </>
  );
};

export default MainPage;
