import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Toolbar, Box, Container, IconButton, MenuItem, Menu, Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../assets/logo.png';
import { redirect } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useContext } from "react";
import { useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';



const Navmenu = () => {
const [mobileMenu, setmobileMenu] = useState(null);
const pages = ['Arena', 'Cards', 'Favourites', "Contact"];
const toggleNavMenu = (event) => {
  setmobileMenu(mobileMenu ? null : event.currentTarget);
};
const theme = useTheme();
const colorMode = useContext(ThemeContext);
const navigate = useNavigate()

const handleLogoClick = () => {
  navigate('/')

};


return (
  <Box sx={{bgcolor:`${theme.palette.background}` }}> 
  <Container >
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Box>
        <NavLink to='/'>
          <img src={logo} alt='logo' style={{ width: '6.5rem', marginLeft: '2rem' }}         onClick={handleLogoClick} />
        </NavLink>
      </Box>

      <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'flex-end' }}>
        <IconButton size='large' onClick={toggleNavMenu} sx={{color: `${theme.palette.color}`}}>
          {mobileMenu ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon sx={{ color: "white" }} />
                ) : (
                  <LightModeOutlinedIcon sx={{ color: "black" }} />
                )}
              </IconButton>
        <Menu
          id='menu-appbar'
          anchorEl={mobileMenu}
          open={Boolean(mobileMenu)}
          onClose={toggleNavMenu}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          {pages.map((page) => (
            <MenuItem key={page} onClick={toggleNavMenu} sx={{ width: '100vw', justifyContent: 'center',bgcolor:`${theme.palette.background}` }}>
              <Typography>
                <NavLink to={`${page.toLowerCase()}`} style={{ textDecoration: 'none', color: `${theme.palette.color}` }}>
                  {page}
                </NavLink>
              </Typography>
            </MenuItem>
          ))}
              <MenuItem onClick={toggleNavMenu} sx={{ width: '100vw', justifyContent: 'center', bgcolor:`${theme.palette.background}` }}>
              <Typography>
                <NavLink to={`account`} style={{ textDecoration: 'none', color:`${theme.palette.color}` }}>
                  {`Account`}
                </NavLink>
              </Typography>
            </MenuItem>

        </Menu>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        {pages.map((page) => (
          <Button key={page} onClick={toggleNavMenu} sx={{ my: 2, color: 'black', fontSize: '16px', fontWeight: '700' }}>
            <NavLink to={`${page.toLowerCase()}`} style={{ textDecoration: 'none', color: `${theme.palette.color}` }}>
              {page}
            </NavLink>
          </Button>
        ))}
           <NavLink to={`account`} style={{ textDecoration: 'none', color: `${theme.palette.color}` }}>
           <PersonIcon sx={{p:3}}/>
            </NavLink>
            <Box display="flex">
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon sx={{ color: "white" }} />
                ) : (
                  <LightModeOutlinedIcon sx={{ color: "black" }} />
                )}
              </IconButton>
            </Box>
 
   
            
        
      </Box>
    </Toolbar>
  </Container></Box>
);
};

export default Navmenu;