import React, { useState } from "react";

import GlobalContext from "./GlobalContext";

import { darkTheme, lightTheme } from "src/theme/theme";

const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeBtn, setActiveBtn] = useState("Home");

  const ActiveBtnHandle = (value) => setActiveBtn(value);
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
          activeBtn,
          ActiveBtnHandle,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </div>
  );
};

export default GlobalContextProvider;
