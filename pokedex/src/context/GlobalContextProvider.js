import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  console.log({ loggedIn, user });
  return (
    <div>
      <GlobalContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          darkMode,
          toggleDarkMode,
          user,
          setUser,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </div>
  );
};

export default GlobalContextProvider;
