import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "src/MainPage";
import {
  HomePage,
  ArenaPage,
  LogInPage,
  RegisterPage,
  EditPage,
  DetailedPage,
  FavoritesPage,
} from "src/Pages";
import { filterFnc } from "src/helpers/filterFnc";
import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchData, fetchPokemonData, fetchDataToFilter, fetchEdited } from "src/api";
const RouterWrapper = () => {
  const localList = localStorage.getItem("favoriteList");
  const dataList = JSON.parse(localList);
  const [arenaFirstFighter, setArenaFirstFighter] = useState(null);
  const [arenaSecondFighter, setArenaSecondFighter] = useState(null);
  const [favoriteList, setFavoriteList] = useState(dataList?.length > 0 ? dataList : []);
  const [editedList, setEditedList] = useState([]);
  const [page, setPage] = useState(1);
  const [searchedValue, setSearchedValue] = useState("");
  const [createComponentData, setCreateComponentData] = useState(null);
  useEffect(() => {
    favoriteList && localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
  }, [favoriteList]);

  const { data: edited } = useQuery({
    queryKey: ["editedPokemons"],
    queryFn: () => fetchEdited(),
    refetchOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  const { data: pokemons, status } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => fetchData((page - 1) * 15),
    enabled: searchedValue === "",
    refetchOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  const { data: pokemonsToFilter } = useQuery({
    queryKey: ["pokemonsToFilter"],
    queryFn: () => fetchDataToFilter(),
    enabled: searchedValue !== "",
    refetchOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  useEffect(() => {
    pokemons && searchedValue === "" && setCreateComponentData(pokemons?.data?.results);
    pokemonsToFilter &&
      searchedValue !== "" &&
      setCreateComponentData(filterFnc(pokemonsToFilter?.data?.results, searchedValue));
  }, [pokemons, pokemonsToFilter, searchedValue]);

  const resultList = createComponentData ? createComponentData : [];
  const pokemonQueries = useQueries({
    queries: resultList?.map((pokemon) => {
      return {
        queryKey: ["pokemon", pokemon.name],
        queryFn: () => fetchPokemonData(pokemon.url),
        refetchOnMount: false,
        staleTime: 10 * (60 * 1000),
      };
    }),
  });
  console.log({ pokemonQueries });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [
        {
          path: "/",
          element: (
            <HomePage
              page={page}
              setPage={setPage}
              searchedValue={searchedValue}
              setSearchedValue={setSearchedValue}
              status={status}
              pokemonQueriesProp={pokemonQueries}
            />
          ),
        },
        {
          path: "favourites",
          element: <FavoritesPage />,
        },
        {
          path: "arena",
          element: (
            <ArenaPage
              pokemonQueries={pokemonQueries}
              firstPokemonAction={setArenaFirstFighter}
              secondPokemonAction={setArenaSecondFighter}
              firstPokemonId={arenaFirstFighter}
              secondPokemonId={arenaSecondFighter}
              setEditedList={setEditedList}
            />
          ),
        },
        {
          path: "logIn",
          element: <LogInPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "edit",
          element: <EditPage />,
        },
        {
          path: "*",
          element: <h1>BAD URL</h1>,
        },
        {
          path: "pokemon/:id",
          element: (
            <DetailedPage
              pokemonQueries={pokemonQueries}
              favoriteProp={favoriteList}
              setFavoriteProp={setFavoriteList}
              firstFighterProp={arenaFirstFighter}
              secondFighterProp={arenaSecondFighter}
              setFirstFighterProp={setArenaFirstFighter}
              setSecondFighterProp={setArenaSecondFighter}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterWrapper;
