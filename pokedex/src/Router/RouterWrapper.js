import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "src/MainPage";
import {
  HomePage,
  ArenaPage,
  LogInPage,
  RegisterPage,
  EditPage,
  DetailedPage,
  FavoritesPage,
} from "src/Pages";
const RouterWrapper = () => {
  const [arenaFirstFighter, setArenaFirstFighter] = useState(null);
  const [arenaSecondFighter, setArenaSecondFighter] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);
  useEffect(() => {
    const localList = localStorage.getItem("favoriteList");
    const dataList = JSON.parse(localList);
    dataList?.length > 0 && setFavoriteList(dataList);
  }, []);
  useEffect(() => {
    favoriteList &&
      localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
  }, [favoriteList]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "favourites",
          element: <FavoritesPage />,
        },
        {
          path: "arena",
          element: (
            <ArenaPage
              firstPokemonId={arenaFirstFighter}
              secondPokemonId={arenaSecondFighter}
            />
          ),
        },
        {
          path: "logIn",
          element: <LogInPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "edit",
          element: <EditPage />,
        },
        {
          path: "*",
          element: <h1>BAD URL</h1>,
        },
        {
          path: "pokemon/:id",
          element: (
            <DetailedPage
              favoriteProp={favoriteList}
              setFavoriteProp={setFavoriteList}
              firstFighterProp={arenaFirstFighter}
              secondFighterProp={arenaSecondFighter}
              setFirstFighterProp={setArenaFirstFighter}
              setSecondFighterProp={setArenaSecondFighter}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterWrapper;
