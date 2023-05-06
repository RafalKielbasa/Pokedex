import { createBrowserRouter } from "react-router-dom";
import {
  ArenaPage,
  EditionPage,
  FavoritesPage,
  HomePage,
  LoginPage,
  RegistrationPage,
  MainPage,
} from "src/Pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "arena", element: <ArenaPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "registration", element: <RegistrationPage /> },
      { path: "edition", element: <EditionPage /> },
    ],
  },
]);
