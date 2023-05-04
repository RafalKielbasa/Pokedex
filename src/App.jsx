import React, { useRef } from "react";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Arena from "./pages/Arena";
import Edycja from "./pages/Edycja";
import Logowanie from "./pages/Logowanie";
import Rejestracja from "./pages/Rejestracja";
import Ulubione from "./pages/Ulubione";
import Wyloguj from "./pages/Wyloguj";
import Details from "./pages/Details";
import { useState, useEffect, useContext } from "react";

import Home from "./pages/Home";
function App() {
  const [favorites, setFavorites] = useState([]);
  console.log("w apce", favorites);
  return (
    <>
      <ResponsiveAppBar />
      <div className="container">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Arena" element={<Arena />} />
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
                <Details setFavorites={setFavorites} favorites={favorites} />
              }
            />
          </Routes>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
