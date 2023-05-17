import React, { useContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "src/Pages/MainPage";
import {
  HomePage,
  ArenaPage,
  LogInPage,
  RegisterPage,
  EditPage,
  DetailedPage,
  FavoritesPage,
} from "src/Pages/ContentPages";
import GlobalContext from "src/context/GlobalContext";
const RouterWrapper = () => {
  const { loggedIn } = useContext(GlobalContext);

  const privateRouter = createBrowserRouter([
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
          element: <ArenaPage />,
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
          element: <DetailedPage />,
        },
      ],
    },
  ]);
  const publicRouter = createBrowserRouter([
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
          element: <ArenaPage />,
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
          path: "*",
          element: <h1>BAD URL</h1>,
        },
        {
          path: "pokemon/:id",
          element: <DetailedPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={loggedIn ? privateRouter : publicRouter} />;
};

export default RouterWrapper;
