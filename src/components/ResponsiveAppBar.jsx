import { useContext, useState } from "react";
import { useTheme } from "@mui/material";
import { AppBar, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import styled from "styled-components";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { ThemeContext } from "../context/ThemeContext";

const StyledTitle = styled.span`
  font-size: 30px;
`;
const pages = [
  { text: "Favorites", path: "favorites", isUser: true },
  { text: "Arena", path: "arena", isUser: true },
  { text: "Sign In", path: "sign-in", isUser: false },
  { text: "Register", path: "register", isUser: false },
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const theme = useTheme();
  const colorMode = useContext(ThemeContext);

  const userDataFromLocalStorage = localStorage.getItem("userData");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    const userData = JSON.parse(userDataFromLocalStorage);
    if (userData) {
      setAnchorElUser(event.currentTarget);
    } else {
      handleClick("Zaloguj sie aby uzyskac dostep", "error");
    }
  };

  const handleClick = (text, type) => {
    enqueueSnackbar(text, { variant: type });
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    navigate("/");
    localStorage.removeItem("userData");
    handleCloseUserMenu();
  };

  const visibleAppBarPages = pages.filter((page) =>
    userDataFromLocalStorage ? page.isUser : page
  );

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <Container maxWidth="x">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box display="flex">
              <Typography
                noWrap
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  letterSpacing: ".2rem",
                  color: "yellow",
                }}
              >
                <Link to={"/"}>
                  <StyledTitle>POKEDEX</StyledTitle>
                </Link>
              </Typography>
              <Tooltip title="Color mode change">
                <IconButton onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon style={{ color: "white" }} />
                  ) : (
                    <LightModeOutlinedIcon style={{ color: "white" }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {visibleAppBarPages.map(({ text, path }) => (
                  <MenuItem
                    key={text}
                    onClick={handleCloseNavMenu}
                    style={{
                      backgroundColor: theme.palette.background.default,
                    }}
                  >
                    <Link to={`/${path}`}>
                      <h2>{text}</h2>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h4"
              noWrap
              sx={{
                display: { md: "none" },
              }}
            >
              <Link to={"/"}>POKEDEX</Link>
            </Typography>
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                  position: "absolute",
                  right: 60,
                },
              }}
            >
              {visibleAppBarPages.map(({ path, text }) => (
                <Button
                  key={text}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "secondary", display: "block" }}
                >
                  <Link to={`/${path}`}>
                    <h2>{text}</h2>
                  </Link>
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                position: "absolute",
                right: "5px",
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <CatchingPokemonIcon
                    style={{ color: "white" }}
                    fontSize="large"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key={"edit"}
                  onClick={handleCloseUserMenu}
                  style={{
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <span>
                    <Link to={`/EditList`}>Edit List</Link>
                  </span>
                </MenuItem>

                <MenuItem
                  key={"logout"}
                  onClick={logOut}
                  style={{
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <span>wyloguj</span>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
