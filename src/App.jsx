import { Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { useMode, ThemeContext } from "./context/ThemeContext";
import { ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Home from "./pages/Home";
import Arena from "./pages/Arena";
import EditList from "./pages/EditList";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import EditForm from "./pages/EditForm";
import Details from "./pages/Details";

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
                  path="/Signin"
                  element={<Signin setUserData={setUserData} />}
                />
                <Route path="/Register" element={<Register />} />
                <Route
                  path="/Favorites"
                  element={
                    <Favorites
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
                  <Route path="/EditList" element={<EditList />} />
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
