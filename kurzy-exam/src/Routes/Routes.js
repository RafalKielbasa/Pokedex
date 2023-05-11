import { createBrowserRouter } from "react-router-dom";
import {
  ArenaPage,
  EditionPage,
  FavoritesPage,
  HomePage,
  LoginPage,
  RegistrationPage,
  MainPage,
  DetailsPage,
} from "src/Pages";
import { getFullResults } from "src/api/source";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      { path: "/", element: <HomePage />, loader: () => getFullResults() },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "arena", element: <ArenaPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "registration", element: <RegistrationPage /> },
      { path: "edition", element: <EditionPage /> },
      { path: "details", element: <DetailsPage /> },
    ],
  },
]);
