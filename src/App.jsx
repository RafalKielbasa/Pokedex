import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import { SnackbarProvider } from "notistack";
import { GlobalStyles, ThemeProvider } from "@mui/material";

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
  const getUserData = localStorage.getItem("userData");
  const [userData, setUserData] = useState(getUserData);
  const [theme, colorMode] = useMode();

  return (
    <>
      <ThemeContext.Provider value={colorMode}>
        <GlobalStyles
          styles={{
            body: { backgroundColor: theme.palette.background.contrast },
          }}
        />
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <ContextProvider>
              <ResponsiveAppBar />
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/arena" element={<Arena />} />
                  <Route
                    path="/sign-in"
                    element={<Signin setUserData={setUserData} />}
                  />
                  <Route path="/register" element={<Register />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/Details/:id/" element={<Details />} />

                  {userData ? (
                    <Route path="/EditList" element={<EditList />} />
                  ) : null}

                  {userData ? (
                    <Route path="/EditForm/:id/" element={<EditForm />} />
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
