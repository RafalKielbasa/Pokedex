import React from "react";
import axios from "axios";
import { createContext } from "react";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "src/theme/theme";
import { useQuery } from "react-query";
import { getFullResults, getFavorites } from "src/api/source";
import { PokemonCard } from "src/Components/PokemonCards";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [fullPokemonDataFormated, setFullPokemonDataFormated] = useState([]);

  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

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

  const context = {
    theme: isDark ? darkTheme : lightTheme,
    toggleTheme,
    isDark,
  };

  return (
    <AppContext.Provider
      value={(context, { isSuccess, fullPokemonDataFormated })}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
