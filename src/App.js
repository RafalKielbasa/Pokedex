import "./App.css";
import { MainPage } from "./components/MainPage";
import { Route, Routes } from "react-router-dom";
import Favorites from "./components/Favorites";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeContext";
import Login from "./components/Login";
import PokemonsCards from "./components/PokemonsCards";

function App() {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/poke" element={<PokemonsCards />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
