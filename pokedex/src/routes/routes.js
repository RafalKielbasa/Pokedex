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
export const router = createBrowserRouter([
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
