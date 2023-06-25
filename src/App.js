// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import EditPage from "./EditPage";
import { GlobalProvider } from "./context/global";
import FetchData from "./FetchData";
import { MoreInfoComponent } from "./MoreInfoComponent";
import FavoriteCard from "./FavoriteCard";
import FightArena from "./FightArena";
import Navbar from "./Navbar";
import Registration from "./Registration";
import Login from "./Login";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <GlobalProvider>
      <SnackbarProvider>
        <header style={{ position: "sticky", top: 0, zIndex: 1000 }}>
          <Navbar />
        </header>

        <Routes>
          <Route path="/" element={<FetchData />} />
          <Route path="/moreinfo" element={<MoreInfoComponent />} />
          <Route path="/favorite" element={<FavoriteCard />} />
          <Route path="/fight" element={<FightArena />} />
          <Route path="/edited" element={<EditPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </SnackbarProvider>
    </GlobalProvider>
  );
};

export default App;
