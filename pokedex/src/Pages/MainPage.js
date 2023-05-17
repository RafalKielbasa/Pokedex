import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation";
const MainPage = () => {
  const localList = localStorage.getItem("favoriteList");
  const dataList = JSON.parse(localList);
  const [arenaFirstFighter, setArenaFirstFighter] = useState(null);
  const [arenaSecondFighter, setArenaSecondFighter] = useState(null);
  const [favoriteList, setFavoriteList] = useState(dataList?.length > 0 ? dataList : []);
  const [page, setPage] = useState(1);
  const [searchedValue, setSearchedValue] = useState("");
  useEffect(() => {
    favoriteList && localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
  }, [favoriteList]);
  return (
    <>
      <Navigation />
      <Outlet
        context={[
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
        ]}
      />
    </>
  );
};

export default MainPage;
