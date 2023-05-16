import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

const GlobalContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  console.log(loggedIn);
  return (
    <div>
      <GlobalContext.Provider
        value={{ loggedIn, setLoggedIn, darkMode, toggleDarkMode }}
      >
        {children}
      </GlobalContext.Provider>
    </div>
  );
};

export default GlobalContextProvider;
