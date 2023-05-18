import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material";

import Home from "./pages/Home";
import Arena from "./pages/Arena";
import EditList from "./pages/EditList";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import EditForm from "./pages/EditForm";
import Details from "./pages/Details";
import { useMode, ThemeContext } from "./context/ThemeContext";
import ContextProvider from "./context/Context";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

function App() {
  const test = localStorage.getItem("userData");
  const [favorites, setFavorites] = useState([]);
  const [battle, setBattle] = useState([]);
  const [userData, setUserData] = useState(test);
  const [theme, colorMode] = useMode();
  console.log("userdata", userData);

  return (
    <>
      <ThemeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <ContextProvider>
              <ResponsiveAppBar />
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/arena"
                    element={<Arena battle={battle} setBattle={setBattle} />}
                  />
                  <Route
                    path="/sign-in"
                    element={<Signin setUserData={setUserData} />}
                  />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/favorites"
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

                  {userData ? (
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
                  ) : null}
                </Routes>
              </div>
            </ContextProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
