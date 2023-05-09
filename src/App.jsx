import React, { createContext, useRef } from "react";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Arena from "./pages/Arena";
import Edycja from "./pages/Edycja";
import Logowanie from "./pages/Logowanie";
import Rejestracja from "./pages/Rejestracja";
import Ulubione from "./pages/Ulubione";
import EditForm from "./pages/EditForm";
import Details from "./pages/Details";
import { useState, useEffect, useContext } from "react";
import { useMode, ThemeContext } from "./context/ThemeContext";
import { ThemeProvider } from "@mui/material";
import Home from "./pages/Home";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [battle, setBattle] = useState([]);
  const [userData, setUserData] = useState([]);
  const [theme, colorMode] = useMode();

  return (
    <>
      <ThemeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <ResponsiveAppBar />
            <div className="container" id={theme}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/Arena"
                  element={<Arena battle={battle} setBattle={setBattle} />}
                />
                <Route
                  path="/Logowanie"
                  element={<Logowanie setUserData={setUserData} />}
                />
                <Route path="/Rejestracja" element={<Rejestracja />} />
                <Route
                  path="/Ulubione"
                  element={
                    <Ulubione
                      setFavorites={setFavorites}
                      favorites={favorites}
                    />
                  }
                />

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

                {userData ? (
                  <Route path="/Edycja" element={<Edycja />} />
                ) : null}

                <Route
                  path="/EditForm/:id/"
                  element={
                    <EditForm
                      setFavorites={setFavorites}
                      favorites={favorites}
                      battle={battle}
                      setBattle={setBattle}
                    />
                  }
                />
              </Routes>
            </div>
          </SnackbarProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
