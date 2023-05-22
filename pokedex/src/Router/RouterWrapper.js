import React, { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import GlobalContext from "src/context/GlobalContext";
import { publicRouter, privateRouter } from "./index";
const RouterWrapper = () => {
  const { loggedIn } = useContext(GlobalContext);
  return <RouterProvider router={loggedIn ? privateRouter : publicRouter} />;
};

export default RouterWrapper;
