import NavBar from "../components/NavBar";
import FooterBar from "../components/FooterBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function MainLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <NavBar />
      <Box
        id="middle_section"
        sx={{
          display: "flex",
          minHeight: "90vh",
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
