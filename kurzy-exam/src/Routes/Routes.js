import React, { useContext } from "react";
import { AppContext } from "src/context/AppContext";
import {
  Route,
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
} from "src/Pages";

const RouterWrapper = () => {
  const { isLoggedIn } = useContext(AppContext);

  //
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainPage />}>
        <Route exact path="/" element={<HomePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="arena" element={<ArenaPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        {isLoggedIn == "true" && (
          <Route path="edition" element={<EditionPage />} />
        )}
        <Route path="details" element={<DetailsPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default RouterWrapper;
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
