import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "src/Navigation/Navigation";

const MainPage = () => (
  <>
    <Navigation />
    <Outlet />
  </>
);
export default MainPage;
