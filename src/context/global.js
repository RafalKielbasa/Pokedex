import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [edited, setEdited] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loser, setLoser] = useState([]);
  const [swich, setSwich] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        pokemons,
        setPokemons,
        edited,
        setEdited,
        userInfo,
        setUserInfo,
        loser,
        setLoser,
        swich,
        setSwich,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
