import React from "react";
import axios from "axios";
import { createContext } from "react";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "src/theme/theme";
import { useQuery } from "react-query";
import { getFullResults } from "src/api/source";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [loggedChange, setLoggedChange] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState("false");
  const [fullPokemonDataFormated, setFullPokemonDataFormated] = useState([]);

  useEffect(() => {
    const isLoggedInfromLS = localStorage.getItem("isLoggedIn");
    if (isLoggedInfromLS) {
      setIsLoggedIn(isLoggedInfromLS);
    }
  }, [loggedChange]);

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
          },
        ];
        return state;
      });
    });
  }, [isSuccess]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const toggleLoggedIn = () => setLoggedChange((prev) => !prev);

  const context = {
    theme: isDark ? darkTheme : lightTheme,
    toggleTheme,
    isDark,
  };

  return (
    <AppContext.Provider
      value={{
        context,
        // isDark,
        // toggleTheme,
        toggleLoggedIn,
        isSuccess,
        fullPokemonDataFormated,
        isLoggedIn,
        loggedChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
