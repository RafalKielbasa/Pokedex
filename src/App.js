import "./App.css";
import { Route, Routes } from "react-router-dom";
import Favorites from "./components/Favorites";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeContext";
import Login from "./components/Login";
import PokemonsCards from "./components/PokemonsCards";
import { SearchProvider } from "./components/SearchContext";
import { FavoritesProvider } from "./components/FavoritesContext";
import FightArena from "./components/FightArena";
import Register from "./components/Register";
import { LoginProvider } from "./components/LoginContext";

function App() {
  return (
    <>
      <LoginProvider>
        <ThemeProvider>
          <SearchProvider>
            <FavoritesProvider>
              <header style={{ position: "sticky", top: 0, zIndex: 1000 }}>
                <Navbar />
              </header>

              <Routes>
                <Route path="/" element={<PokemonsCards />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/register" element={<Register />} />
                <Route path="/arena" element={<FightArena />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </FavoritesProvider>
          </SearchProvider>
        </ThemeProvider>
      </LoginProvider>
    </>
  );
}

export default App;
