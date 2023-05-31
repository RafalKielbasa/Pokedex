import { createContext } from "react";
import { useUserQuery } from "../hooks/useUser";
import { LocalStorage } from "../const/LocalStorage";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { data } = useUserQuery(localStorage.getItem(LocalStorage.LsUserItem));

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
