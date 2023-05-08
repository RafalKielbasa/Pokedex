import { useContext, createContext, useState } from "react";

export const FavoriteContext = createContext();

export const useFavorite = () => {
  return useContext(FavoriteContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(false);

  const closeError = () => {
    setError(false);
  };
  const addFavorite = (addNew) => {
    if (ifExist(addNew.id)) {
      setError(true);
    } else {
      setFavorites([...favorites, addNew]);
    }
  };

  const ifExist = (id) => {
    return favorites.some((item) => item.id === id);
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };
  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, error, closeError }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
