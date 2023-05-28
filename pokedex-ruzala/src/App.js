import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Box } from "@mui/material";
import {
  Pokemons,
  Arena,
  Favorites,
  Login,
  Register,
  HomePage,
  EditPokemon,
} from "./pages";
import { useEffect, useState } from "react";
import React from "react";
import PokemonPreview from "./pages/PokemonPreview";
import { SnackbarProvider } from "notistack";
import { useQuery } from "@tanstack/react-query";
import fetchPokeLinks from "./fetching/fetchPokeLinks";
import fetchArray from "./fetching/fetchArray";
import fetchData from "./fetching/fetchData";
import updateCurrentArray from "./functional/updateCurrentArray";
import verifyLoginState from "./fetching/verifyLoginState";

export const GlobalContext = React.createContext();
const baseURL = process.env.REACT_APP_BASE_URL;

function App() {
  const [loginState, setLoginState] = useState(false);
  const [favoritesArray, setFavoritesArray] = useState([]);
  const [arenaArray, setArenaArray] = useState([]);
  const [arrayOfModifiedPokemon, setArrayOfModifiedPokemon] = useState([]);
  const [currentArray, setCurrentArray] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);

  const pokemonLinks = useQuery({
    queryKey: ["pokemonLinks"],
    queryFn: () => fetchPokeLinks(),
    staleTime: 1000000,
  });
  const pokemons = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => fetchArray(pokemonLinks.data),
    staleTime: 1000000,
    enabled: pokemonLinks.data ? true : false,
  });
  const pokeTypes = useQuery({
    queryKey: ["pokeTypes"],
    queryFn: () => fetchData(`${baseURL}type`),
    staleTime: 1000000,
  });

  useEffect(() => {
    const localStoragePokemons = JSON.parse(
      localStorage.getItem("modifiedPokemon")
    );
    if (localStoragePokemons) {
      if (localStoragePokemons.length > 0) {
        setArrayOfModifiedPokemon(localStoragePokemons);
      }
    }
    verifyLoginState(setLoginState);
  }, []);

  useEffect(() => {
    if (arrayOfModifiedPokemon.length > 0) {
      localStorage.setItem(
        "modifiedPokemon",
        JSON.stringify(arrayOfModifiedPokemon)
      );
    }
  }, [arrayOfModifiedPokemon]);

  useEffect(
    () =>
      setCurrentArray(
        updateCurrentArray(pokemons.data, arrayOfModifiedPokemon)
      ),
    [pokemons.data, arrayOfModifiedPokemon]
  );
  useEffect(
    () => pokeTypes.data && setPokemonTypes(pokeTypes.data.results),
    [pokeTypes.data]
  );

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
        {loginState && <Route path="edit" element={<EditPokemon />} />}
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
          pokemons,
          currentArray,
          setCurrentArray,
          pokemonTypes,
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
