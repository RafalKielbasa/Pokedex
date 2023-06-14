import React from "react";
import axios from "axios";
import { createContext } from "react";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "src/theme/theme";
import { useQuery } from "react-query";
import { getFullResults } from "src/api/source";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [afterBattle, setAfterBattle] = useState([]);
  const [afterBattleIds, setAfterBattleIds] = useState([]);
  const [fullPokemonDataFormated, setFullPokemonDataFormated] = useState([]);
  const [expFullPokemonDataFormated, setExpFullPokemonDataFormated] = useState(
    []
  );

  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

  const queryFullData = useQuery({
    queryKey: ["fullData"],
    queryFn: () => getFullResults(),
    staleTime: 1000000,
  });

  const { data, isSuccess, isLoading, isFetching } = queryFullData;

  useEffect(() => {
    const getAfterTheBattle = async () => {
      const response = await axios.get(`http://localhost:3001/afterTheBattle/`);
      setAfterBattle(response.data);
      const getBattleIds = response?.data?.map((item) => item.id);
      setAfterBattleIds(getBattleIds);
    };
    getAfterTheBattle();
  }, []);

  useEffect(() => {
    data?.map(async (item) => {
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

  useEffect(() => {
    const array = fullPokemonDataFormated?.filter((fPDelem) => {
      return afterBattleIds?.some((fIele) => {
        return fPDelem.id === fIele;
      });
    });
    const filterFPD = fullPokemonDataFormated?.filter(
      (n) => !array.includes(n)
    );
    const getExpFPD = afterBattle
      .concat(filterFPD)
      .sort((a, b) => (a.id > b.id ? 1 : -1));
    setExpFullPokemonDataFormated(getExpFPD);
  }, [fullPokemonDataFormated]);

  const context = {
    theme: isDark ? darkTheme : lightTheme,
    toggleTheme,
    isDark,
  };

  return (
    <AppContext.Provider
      value={(context, { isSuccess, expFullPokemonDataFormated })}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
