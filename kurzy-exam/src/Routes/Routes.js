import { useContext } from "react";
import { AppContext } from "src/context/AppContext";
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

export const RouterWrapper = () => {
  const { isLoggedIn } = useContext(AppContext);

  console.log(`isLoggedIn`, isLoggedIn);
};
//
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
        path: "favorites",
        element: <FavoritesPage />,
      },
      { path: "arena", element: <ArenaPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "registration", element: <RegistrationPage /> },
      { path: "edition", element: <EditionPage /> },
      { path: "details", element: <DetailsPage /> },
    ],
  },
]);

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainPage />,
//     children: [
//       {
//         path: "/",
//         element: <HomePage />,
//       },
//       {
//         path: "favorites",
//         element: <FavoritesPage />,
//       },
//       { path: "arena", element: <ArenaPage /> },
//       { path: "login", element: <LoginPage /> },
//       { path: "registration", element: <RegistrationPage /> },
//       { path: "edition", element: <EditionPage /> },
//       { path: "details", element: <DetailsPage /> },
//     ],
//   },
// ]);
