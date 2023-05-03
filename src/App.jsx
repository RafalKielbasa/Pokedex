import React, { useRef } from "react";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { Route, Routes } from "react-router-dom";
import Arena from "./pages/Arena";
import Edycja from "./pages/Edycja";
import Logowanie from "./pages/Logowanie";
import Rejestracja from "./pages/Rejestracja";
import Ulubione from "./pages/Ulubione";
import Wyloguj from "./pages/Wyloguj";
import Details from "./pages/Details";

import Home from "./pages/Home";
function App() {
  return (
    <>
      <ResponsiveAppBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Arena" element={<Arena />} />
          <Route path="/Edycja" element={<Edycja />} />
          <Route path="/Logowanie" element={<Logowanie />} />
          <Route path="/Rejestracja" element={<Rejestracja />} />
          <Route path="/Ulubione" element={<Ulubione />} />
          <Route path="/Wyloguj" element={<Wyloguj />} />
          <Route path="/Details" element={<Details />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
