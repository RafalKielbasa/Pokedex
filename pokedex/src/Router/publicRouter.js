import { createBrowserRouter } from "react-router-dom";
import MainPage from "src/Pages/MainPage";
import {
  HomePage,
  ArenaPage,
  LogInPage,
  RegisterPage,
  DetailedPage,
  FavoritesPage,
} from "src/Pages/ContentPages";
export const publicRouter = createBrowserRouter([
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
        path: "pokemon/:name",
        element: <DetailedPage />,
      },
    ],
  },
]);
