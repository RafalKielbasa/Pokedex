import React, { useState } from "react";

import { Outlet } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { Navigation } from "../Navigation";

import { fetchLocalList } from "src/api/fetchDataFunctions";

import { Loader, ErrorMsg } from "src/components/loaders";

const MainPage = () => {
  const {
    data: editedList,
    status: editedStatus,
    error: editedError,
  } = useQuery({
    queryKey: ["editedPokemons"],
    queryFn: () => fetchLocalList("edited"),
    staleTime: 10 * (60 * 1000),
  });

  const {
    data: favoriteList,
    status: favoriteStatus,
    error: favoriteError,
  } = useQuery({
    queryKey: ["favorite"],
    queryFn: () => fetchLocalList("favorite"),
    staleTime: 10 * (60 * 1000),
  });

  const [arenaFirstFighter, setArenaFirstFighter] = useState(null);
  const [arenaSecondFighter, setArenaSecondFighter] = useState(null);

  if (editedStatus === "loading" || favoriteStatus === "loading") return <Loader />;
  if (editedStatus === "error") return <ErrorMsg errorMsg={editedError.message} />;
  if (favoriteStatus === "error") return <ErrorMsg errorMsg={favoriteError.message} />;

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
          editedList,
          editedStatus,
          favoriteStatus,
        }}
      />
    </>
  );
};

export default MainPage;
