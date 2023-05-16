import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
import { darkTheme, lightTheme } from "src/theme/theme";

const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
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
          theme: darkMode ? darkTheme : lightTheme,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </div>
  );
};

export default GlobalContextProvider;
