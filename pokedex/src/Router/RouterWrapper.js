import React, { useEffect, useState, useContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "src/Pages/MainPage";
import {
  HomePage,
  ArenaPage,
  LogInPage,
  RegisterPage,
  EditPage,
  DetailedPage,
  FavoritesPage,
} from "src/Pages/ContentPages";
import { filterFnc } from "src/helpers";
import { useQuery, useQueries, useQueryClient } from "@tanstack/react-query";
import {
  fetchData,
  fetchPokemonData,
  fetchDataToFilter,
  fetchEdited,
} from "src/api";
import GlobalContext from "src/context/GlobalContext";
const RouterWrapper = () => {
  const { loggedIn } = useContext(GlobalContext);
  const localList = localStorage.getItem("favoriteList");
  const dataList = JSON.parse(localList);
  const queryClient = useQueryClient();
  const [arenaFirstFighter, setArenaFirstFighter] = useState(null);
  const [arenaSecondFighter, setArenaSecondFighter] = useState(null);
  const [favoriteList, setFavoriteList] = useState(
    dataList?.length > 0 ? dataList : []
  );
  const [page, setPage] = useState(1);
  const [searchedValue, setSearchedValue] = useState("");
  const [createComponentData, setCreateComponentData] = useState(null);
  useEffect(() => {
    favoriteList &&
      localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
  }, [favoriteList]);

  const { data: edited } = useQuery({
    queryKey: ["editedPokemons"],
    queryFn: () => fetchEdited(),
    refetchOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  const editedList = edited?.data?.map((value) => value.name);
  editedList?.forEach((value, index) => {
    queryClient.setQueryData(["pokemon", value], { data: edited?.data[index] });
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
    pokemons &&
      searchedValue === "" &&
      setCreateComponentData(pokemons?.data?.results);
    pokemonsToFilter &&
      searchedValue !== "" &&
      setCreateComponentData(
        filterFnc(pokemonsToFilter?.data?.results, searchedValue)
      );
  }, [pokemons, pokemonsToFilter, searchedValue]);

  const resultList = createComponentData ? createComponentData : [];
  const filteredQueriesKeys = [
    "abilities",
    "base_experience",
    "height",
    "id",
    "name",
    "sprites",
    "weight",
  ];
  const pokemonQueries = useQueries({
    queries: resultList?.map(({ name, url }) => {
      return {
        queryKey: ["pokemon", name],
        queryFn: () => fetchPokemonData(url),
        enabled: !editedList?.includes(name),
        refetchOnMount: false,
        staleTime: 10 * (60 * 1000),
        onSuccess: (data) =>
          queryClient.setQueryData(["pokemon", name], (prev) => {
            const oldData = Object.fromEntries(
              Object.entries(data?.data).filter(([key]) =>
                filteredQueriesKeys.includes(key)
              )
            );
            const updatedData = {
              ...prev,
              data: { ...oldData, winCount: 0, lossCount: 0, tieCount: 0 },
            };
            return updatedData;
          }),
      };
    }),
  });
  const privateRouter = createBrowserRouter([
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
              pokemonQueries={pokemonQueries}
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
            />
          ),
        },
        {
          path: "edit",
          element: <EditPage pokemonQueries={pokemonQueries} />,
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
  const publicRouter = createBrowserRouter([
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
  return <RouterProvider router={loggedIn ? privateRouter : publicRouter} />;
};

export default RouterWrapper;
