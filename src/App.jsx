import React, { createContext, useRef } from "react";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Arena from "./pages/Arena";
import Edycja from "./pages/Edycja";
import Logowanie from "./pages/Logowanie";
import Rejestracja from "./pages/Rejestracja";
import Ulubione from "./pages/Ulubione";
import Wyloguj from "./pages/Wyloguj";
import Details from "./pages/Details";
import { useState, useEffect, useContext } from "react";

import { useMode, ThemeContext } from "./context/ThemeContext";
import { ThemeProvider } from "@mui/material";

import Home from "./pages/Home";
function App() {
  const [favorites, setFavorites] = useState([]);
  const [battle, setBattle] = useState([]);
  const [theme, colorMode] = useMode();

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };
  return (
    <>
      <ThemeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <ResponsiveAppBar />
          <div className="container" id={theme}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/Arena"
                element={<Arena battle={battle} setBattle={setBattle} />}
              />
              <Route path="/Edycja" element={<Edycja />} />
              <Route path="/Logowanie" element={<Logowanie />} />
              <Route path="/Rejestracja" element={<Rejestracja />} />
              <Route
                path="/Ulubione"
                element={
                  <Ulubione setFavorites={setFavorites} favorites={favorites} />
                }
              />
              <Route path="/Wyloguj" element={<Wyloguj />} />
              <Route
                path="/Details/:id/"
                element={
                  <Details
                    setFavorites={setFavorites}
                    favorites={favorites}
                    battle={battle}
                    setBattle={setBattle}
                  />
                }
              />
            </Routes>
          </div>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
