import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchLocalList } from "src/api/fetchDataFunctions";
const MainPage = () => {
  const { data: editedList, status: editedStatus } = useQuery({
    queryKey: ["editedPokemons"],
    queryFn: () => fetchLocalList("edited"),
    staleTime: 10 * (60 * 1000),
  });
  const { data: favorite, status: favoriteStatus } = useQuery({
    queryKey: ["favorite"],
    queryFn: () => fetchLocalList("favorite"),
    staleTime: 10 * (60 * 1000),
  });
  const [arenaFirstFighter, setArenaFirstFighter] = useState(null);
  const [arenaSecondFighter, setArenaSecondFighter] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    favoriteStatus === "success" && setFavoriteList(favorite);
  }, [favoriteStatus, favorite]);
  return (
    <>
      <Navigation />
      <Outlet
        context={{
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
