import React, { useContext } from "react";
import { AppContext } from "src/context/AppContext";
import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  ArenaPage,
  EditionPage,
  FavoritesPage,
  HomePage,
  LoginPage,
  RegistrationPage,
  MainPage,
  DetailsPage,
  RankingPage,
} from "src/Pages";

const RouterWrapper = () => {
  const { isLoggedIn } = useContext(AppContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainPage />}>
        <Route exact path="/" element={<HomePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="arena" element={<ArenaPage />} />
        <Route path="ranking" element={<RankingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="registration"
          element={
            isLoggedIn == "false" ? (
              <RegistrationPage />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />

        <Route
          path="edition"
          element={
            isLoggedIn == "true" ? (
              <EditionPage />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />

        <Route path="details" element={<DetailsPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default RouterWrapper;
