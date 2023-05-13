import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Box } from "@mui/material";
import { Pokemons, Arena, Favorites, Login, Register, HomePage } from "./pages";
import { useState } from "react";
import FavoritesButton from "./components/FavoritesButton";
import React from "react";
import PokemonPreview from "./pages/PokemonPreview";

export const GlobalContext = React.createContext();

function App() {
  const [loginState, setLoginState] = useState(false);
  const [favoritesArray, setFavoritesArray] = useState([]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="pokemons" element={<Pokemons />} />
        <Route path="pokemon/:id" element={<PokemonPreview />} />
        <Route path="arena" element={<Arena />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="favor" element={<FavoritesButton />} />
      </Route>
    )
  );

  return (
    <Box>
      <GlobalContext.Provider
        value={{ loginState, setLoginState, favoritesArray, setFavoritesArray }}
      >
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </Box>
  );
}

export default App;
