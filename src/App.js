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
import PokemonMoreCard from "./components/PokemonMoreCard";
import UserPanel from "./components/UserPanel";
import { FightArenaProvider } from "./components/FightArenaContext";
import EditPokemons from "./components/EditPokemons";
import { NewPokemonProvider } from "./components/NewPokemonContext";

function App() {
  const ErrorPage = () => {
    return (
      <div>
        <h1>404 </h1>
        <p>Page not found</p>
      </div>
    );
  };

  return (
    <>
      <NewPokemonProvider>
        <LoginProvider>
          <ThemeProvider>
            <SearchProvider>
              <FightArenaProvider>
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
                    <Route path="/user" element={<UserPanel />} />
                    <Route path="/edit" element={<EditPokemons />} />

                    <Route
                      path="/pokemon/:pokemonName"
                      element={<PokemonMoreCard />}
                    />
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </FavoritesProvider>
              </FightArenaProvider>
            </SearchProvider>
          </ThemeProvider>
        </LoginProvider>
      </NewPokemonProvider>
    </>
  );
}

export default App;
