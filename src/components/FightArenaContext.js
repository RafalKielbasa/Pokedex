import { createContext, useState } from "react";

export const FightArenaContext = createContext();

export const FightArenaProvider = ({ children }) => {
  const [fightArena, setFightArena] = useState([]);
  const [winner, setWinner] = useState(null);
  const [alert, setAlert] = useState(false);

  const addPokemonToFightArena = (pokemon) => {
    if (ifExistFightPokemon(pokemon.id)) {
      return false;
    } else if (fightArena.length === 2) {
      window.alert("Arena is full like your mom");
    } else {
      setFightArena([...fightArena, pokemon]);
    }
  };

  const ifExistFightPokemon = (id) => {
    return fightArena.some((item) => item.id === id);
  };

  const clearArena = () => {
    setFightArena([]);
    setWinner(null);
  };

  return (
    <FightArenaContext.Provider
      value={{
        fightArena,
        addPokemonToFightArena,
        clearArena,
        winner,
        setWinner,
        alert,
      }}
    >
      {children}
    </FightArenaContext.Provider>
  );
};
