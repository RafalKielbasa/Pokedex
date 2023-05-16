import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation";
const MainPage = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default MainPage;
