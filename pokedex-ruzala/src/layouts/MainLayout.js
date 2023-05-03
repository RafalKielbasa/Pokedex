import NavBar from "../components/NavBar";
import FooterBar from "../components/FooterBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/material";

export default function MainLayout() {
  const [loginState, setLoginState] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <NavBar loginState={loginState} />
      <Box
        id="middle_section"
        sx={{
          display: "flex",
          height: "100%",
          width: "90%",
          backgroundColor: "primary.light",
          alignSelf: "center",
        }}
      >
        <Outlet />
      </Box>
      <FooterBar />
    </Box>
  );
}
