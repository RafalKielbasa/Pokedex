import React from "react";
import DrawerAppBar from "../Components/DrawerAppBar";

function MainLayout({ children }) {
  return (
    <>
      <DrawerAppBar />
      <div>{children}</div>
    </>
  );
}

export default MainLayout;
