import { createContext } from "react";
import { useUserQuery } from "../hooks/useUser";
import { LocalStorage } from "../const/LocalStorage";

export const ButtonContext = createContext();

export const ButtonContextProvider = ({ children }) => {
  const { data } = useUserQuery(localStorage.getItem(LocalStorage.LsUserItem));

  return (
    <ButtonContext.Provider value={data}>{children}</ButtonContext.Provider>
  );
};
