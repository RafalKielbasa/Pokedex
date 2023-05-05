import "./App.css";
import { MainPage } from "./components/MainPage";
import { Route, Routes } from "react-router-dom";
import Favorites from "./components/Favorites";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeContext";
import Login from "./components/Login";
import PokemonsCards from "./components/PokemonsCards";
import { SearchProvider } from "./components/SearchContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <SearchProvider>
          <header style={{ position: "sticky", top: 0, zIndex: 1000 }}>
            <Navbar />
          </header>
          <Routes>
            <Route path="/" element={<PokemonsCards />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            {/*<Route path="/poke" element={<PokemonsCards />} />*/}
          </Routes>
        </SearchProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
