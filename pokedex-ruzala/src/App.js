import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Box } from "@mui/material";
import { HomePage, Arena, Favorites, Login, Register } from "./pages";
import { useQuery } from "@tanstack/react-query";
import fetchData from "./fetching/fetchData";
import { useState } from "react";
import FavoritesButton from "./components/FavoritesButton";
import React from "react";

const baseURL = process.env.REACT_APP_BASE_URL;
export const GlobalContext = React.createContext();

function App() {
  const [loginState, setLoginState] = useState(false);
  const [favoritesArray, setFavoritesArray] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["collection"],
    queryFn: () => fetchData(baseURL),
    staleTime: 1000000,
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {data && <Route index element={<HomePage collection={data} />} />}
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
