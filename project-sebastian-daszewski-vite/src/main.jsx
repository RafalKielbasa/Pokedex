import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Pokedex from "../pages/Pokedex.jsx";
import Pokeinfo from "../Components/PokeInfo.jsx";
import Ranking from "../pages/Ranking.jsx";
import Favorites from "../pages/Favorites.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Routes, Route, useParams } from "react-router-dom";
import Arena from "../pages/Arena.jsx";
import Login from "../pages/Login.jsx";
import Registration from "../pages/Registration.jsx";
import Settings from "../pages/Settings.jsx";
import { AppProvider } from "../src/AppContext"; // Dodane

const PrivateRoute = ({ element: Element, path }) => {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  if (
    isLoggedIn == false &&
    (path === "/rejestracja" || path === "/logowanie")
  ) {
    return <Element />;
  }

  if (isLoggedIn == false) {
    return <Navigate to="/logowanie" replace />;
  }

  if (
    isLoggedIn == true &&
    (path === "/rejestracja" || path === "/logowanie")
  ) {
    return <Navigate to="/pokedex/1" replace />;
  }
  if (path.startsWith("/pokedex/")) {
    const number = path.split("/")[2];
    return <Navigate to={`/pokemon/${number}`} replace />;
  }

  return <Element />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokedex/:number",
    element: (
      <AppProvider>
        <Pokedex />
      </AppProvider>
    ),
  },
  {
    path: "/pokemon/:id",
    element: (
      <AppProvider>
        <Pokeinfo />
      </AppProvider>
    ),
  },
  {
    path: "/ranking/:number",
    element: (
      <AppProvider>
        <Ranking />
      </AppProvider>
    ),
  },
  {
    path: "/ulubione",
    element: (
      <AppProvider>
        <Favorites />
      </AppProvider>
    ),
  },
  {
    path: "/arena",
    element: (
      <AppProvider>
        <Arena />
      </AppProvider>
    ),
  },
  {
    path: "/logowanie",
    element: <PrivateRoute element={Login} path="/logowanie" />,
  },
  {
    path: "/rejestracja",
    element: <PrivateRoute element={Registration} path="/rejestracja" />,
  },
  {
    path: "/edycja",
    element: (
      <AppProvider>
        <PrivateRoute element={Settings} path="/edycja" />
      </AppProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
