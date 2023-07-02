import React from "react";
import axios from "axios";
import { createContext } from "react";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "src/theme/theme";
import { useQuery } from "react-query";
import { getFullResults } from "src/api/source";
import { createTheme } from "@mui/material/styles";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [loggedChange, setLoggedChange] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState("false");
  const [fullPokemonDataFormated, setFullPokemonDataFormated] = useState([]);
  const [battle, setBattle] = useState([]);
  const [battleIds, setBattleIds] = useState([]);
  const [battleChange, setBattleChange] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritesIds, setFavoritesIds] = useState([]);
  const [favoritesChange, setFavoritesChange] = useState(false);
  const [switchChange, setSwitchChange] = useState(false);
  const [activeButton, setActiveButton] = useState("Home");

  useEffect(() => {
    const isLoggedInfromLS = localStorage.getItem("isLoggedIn");
    if (isLoggedInfromLS) {
      setIsLoggedIn(isLoggedInfromLS);
    }
  }, [loggedChange]);

  useEffect(() => {
    const switchIsDarkfromLS = localStorage.getItem("switchIsDark");
    if (switchIsDarkfromLS) {
      switchIsDarkfromLS === false || switchIsDarkfromLS === "false"
        ? setIsDark(false)
        : setIsDark(true);
    }
  }, [switchChange]);

  useEffect(() => {
    axios.get(`http://localhost:3001/battle/`).then((response) => {
      setBattle(response?.data);
      setBattleIds(response?.data?.map((item) => item.id));
    });
  }, [battleChange]);

  useEffect(() => {
    axios.get(`http://localhost:3001/favoriteData/`).then((response) => {
      setFavorites(response.data);
      setFavoritesIds(response?.data?.map((item) => item.id));
    });
  }, [favoritesChange]);

  const queryFullData = useQuery({
    queryKey: ["fullData"],
    queryFn: () => getFullResults(),
    staleTime: 1000000,
  });
  const { isSuccess } = queryFullData;

  useEffect(() => {
    queryFullData?.data?.map(async (item) => {
      const responseurls = await axios.get(item?.url);
      const urlsData = responseurls?.data;
      setFullPokemonDataFormated((state) => {
        state = [
          ...state,
          {
            id: urlsData.id,
            pic: urlsData.sprites.front_default,
            picDet: urlsData.sprites.other.dream_world.front_default,
            name: urlsData.name,
            height: urlsData.height,
            baseexp: urlsData.base_experience,
            weight: urlsData.weight,
            abilitie: urlsData.abilities[0].ability.name,
            wins: 0,
          },
        ];
        return state;
      });
    });
  }, [isSuccess]);

  const toggleLoggedIn = () => setLoggedChange((prev) => !prev);
  const toggleBattleChange = () => setBattleChange((prev) => !prev);
  const toggleFavoritesChange = () => setFavoritesChange((prev) => !prev);
  const toggleSwitchChange = () => setSwitchChange((prev) => !prev);
  const handleActiveButton = (value) => setActiveButton(value);

  const theme2 = createTheme({
    palette: {
      primary: {
        main: "#333333",
      },
      secondary: {
        main: "#ffffff",
      },
    },
  });

  return (
    <AppContext.Provider
      value={{
        theme: isDark ? darkTheme : lightTheme,
        theme2,
        isDark,
        isSuccess,
        fullPokemonDataFormated,
        toggleLoggedIn,
        isLoggedIn,
        loggedChange,
        toggleBattleChange,
        battle,
        battleIds,
        toggleFavoritesChange,
        favorites,
        favoritesIds,
        toggleSwitchChange,
        handleActiveButton,
        activeButton,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
