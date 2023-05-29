import { createContext } from "react";
import { useState } from "react";

export const NewPokemonContext = createContext();

export const NewPokemonProvider = ({ children }) => {
  const [newPokemon, setNewPokemon] = useState([]);

  return (
    <NewPokemonContext.Provider value={{ newPokemon, setNewPokemon }}>
      {children}
    </NewPokemonContext.Provider>
  );
};
