import React from "react";
import { Outlet } from "react-router-dom";

import { Navigation } from "./Navigation";

const MainPage = () => {
  const myContext = { someData: "Testowe Dane" };
  return (
    <>
      <Navigation />
      <Outlet context={myContext} />
    </>
  );
};

export default MainPage;
