import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { GlobalContext } from "./context/global";
import { useSnackbar } from "notistack";
import Switch from "@mui/material/Switch";

function Navbar() {
  const { userInfo, setUserInfo, swich, setSwich } = useContext(GlobalContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem("user");
    enqueueSnackbar("Logout success", { variant: "success" });
  };

  const handleSwitchChange = () => {
    setSwich(!swich);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar style={{ background: swich ? "#03001C" : "#1976D2" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            POKeDEX
          </Typography>
          <Typography variant="10px" component="div" sx={{ flexGrow: 5 }}>
            {userInfo ? `Welcome ${userInfo.email}` : null}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Switch
              defaultChecked
              color="secondary"
              checked={swich}
              onChange={handleSwitchChange}
            />
            <Button component={RouterLink} to="/" color="inherit">
              Home
            </Button>
            <Button component={RouterLink} to="/favorite" color="inherit">
              Favorite
            </Button>
            <Button component={RouterLink} to="/fight" color="inherit">
              Fight Arena
            </Button>
            {userInfo ? (
              <Button component={RouterLink} to="/edited" color="inherit">
                Edited
              </Button>
            ) : null}
            <Button component={RouterLink} to="/register" color="inherit">
              Register
            </Button>
            {userInfo ? (
              <Button
                onClick={handleLogout}
                component={RouterLink}
                to="/"
                color="inherit"
              >
                Logout
              </Button>
            ) : (
              <Button component={RouterLink} to="/login" color="inherit">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
