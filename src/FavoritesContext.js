import { createContext, useState, useContext } from "react";

// 1.createContext jest wboduwane w react i musze nadac mu jakas nazwe ? tutaj nadaje FavoriteContext ale moge nazwac to dowolnie ?
const FavoritesContext = createContext();

// 2.exportuje useFavorites aby moc skorzystac z niego w innych plikach ?
// 3. zwracam useContext równiez wbudowany w react i podaje mu jako argument zawsze to po podałem do createContext ? dobrze to rozumiem ?
export const useFavorites = () => {
  return useContext(FavoritesContext);
};
// 4.tutaj exportuje FvoritesProvider które będzie opakowywał children, w tym wypadku plik App.js ?
// 5. tworze pusta tablice favorites w ktorej jeszcze nic nie ma ale zostanie przekazane ?
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // 6. torze nowa funckje addFavorite, moge rozumiem nazwac ja dowolnie ? i ona ma za zadnie dodac nowy element nazwany tu newFavorite do istniejacej juz tablicy ...favorite i uaktualnic o kazdy nowy element ?
  const addFavorite = (newFavorite) => {
    setFavorites([...favorites, newFavorite]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
