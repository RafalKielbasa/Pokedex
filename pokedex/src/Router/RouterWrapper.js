import React, { useContext } from "react";

import { RouterProvider } from "react-router-dom";

import GlobalContext from "src/context/GlobalContext";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

import MainPage from "src/Pages/MainPage";

import {
  HomePage,
  ArenaPage,
  EditPage,
  DetailedPage,
  FavoritesPage,
  LogInPage,
  RegisterPage,
} from "src/Pages/ContentPages";

const RouterWrapper = () => {
  const { loggedIn } = useContext(GlobalContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainPage />}>
        <Route path="/" element={<HomePage />} />
        <Route exact path="favourites" element={<FavoritesPage />} />
        <Route exact path="arena" element={<ArenaPage />} />
        <Route
          exact
          path="edit"
          element={loggedIn ? <EditPage /> : <Navigate replace to={"/"} />}
        />
        <Route exact path="*" element={<h1>BAD URL</h1>} />
        <Route exact path="pokemon/:name" element={<DetailedPage />} />
        <Route
          exact
          path="logIn"
          element={!loggedIn ? <LogInPage /> : <Navigate replace to={"/"} />}
        />
        <Route
          exact
          path="register"
          element={!loggedIn ? <RegisterPage /> : <Navigate replace to={"/"} />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default RouterWrapper;
