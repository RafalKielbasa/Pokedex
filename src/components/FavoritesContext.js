import { useContext, createContext, useState } from "react";

export const FavoriteContext = createContext();

export const useFavorite = () => {
  return useContext(FavoriteContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);

  const closeError = () => {
    setError(false);
  };
  const addFavorite = (addNew) => {
    if (ifExist(addNew.id)) {
      setError(true);
    } else {
      setFavorites([...favorites, addNew]);
      setCount((prev) => prev + 1);
    }
  };

  const ifExist = (id) => {
    return favorites.some((item) => item.id === id);
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
    setCount((prev) => prev - 1);
  };

  const removeAll = () => {
    setFavorites([]);
    setCount(0);
  };

  const updateFavorite = (updatedPokemon) => {
    setFavorites((prev) => {
      const index = prev.findIndex((item) => item.id === updatedPokemon.id);
      if (index !== -1) {
        const newFavorites = [...prev];
        newFavorites[index] = updatedPokemon;
        return newFavorites;
      } else {
        return [...prev, updatedPokemon];
      }
    });
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        error,
        closeError,
        removeAll,
        count,
        updateFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
