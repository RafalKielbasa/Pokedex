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
import React from "react";
import PokemonPreview from "./pages/PokemonPreview";
import { SnackbarProvider } from "notistack";

export const GlobalContext = React.createContext();

function App() {
  const [loginState, setLoginState] = useState(false);
  const [favoritesArray, setFavoritesArray] = useState([]);
  const [arenaArray, setArenaArray] = useState([]);
  const [arrayOfModifiedPokemon, setArrayOfModifiedPokemon] = useState([]);

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
      </Route>
    )
  );

  return (
    <Box>
      <GlobalContext.Provider
        value={{
          loginState,
          setLoginState,
          favoritesArray,
          setFavoritesArray,
          arenaArray,
          setArenaArray,
          arrayOfModifiedPokemon,
          setArrayOfModifiedPokemon,
        }}
      >
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </GlobalContext.Provider>
    </Box>
  );
}

export default App;
