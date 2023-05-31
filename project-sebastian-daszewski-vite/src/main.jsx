import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Pokedex from "../pages/Pokedex.jsx";
import Pokeinfo from "../Components/PokeInfo.jsx";
import Favourites from "../pages/Favourites.jsx";
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

const PrivateRoute = ({ element: Element, path }) => {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  if (!isLoggedIn && (path === "/rejestracja" || path === "/logowanie")) {
    return <Element />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/logowanie" replace />;
  }

  if (isLoggedIn && (path === "/rejestracja" || path === "/logowanie")) {
    return <Navigate to="/pokedex/1" replace />;
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
    element: <Pokedex />,
  },
  {
    path: "/pokemon/:id",
    element: <Pokeinfo />,
  },
  {
    path: "/ulubione",
    element: <Favourites />,
  },
  {
    path: "/arena",
    element: <Arena />,
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
    element: <PrivateRoute element={Settings} path="/edycja" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
