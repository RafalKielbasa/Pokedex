import React from 'react';
import { Box, Container, Stack, Typography, Menu, MenuItem } from '@mui/material';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

function Footer() {
  const pages = [
    { label: 'Home Page', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
  ];

  const FooterLink = styled(Link)({
    fontSize: '14px',
    color: 'white',
    textDecoration: 'none',
    marginRight: '1rem',
    marginTop: {xs: 0, sm:15},
  });

  return (
    <>
      <Box sx={{ bgcolor: 'primary.second' }}>
        <Container sx={{ display: 'flex', flexWrap: "wrap", justifyContent:"center"}}>
          <Box sx={{ width: {xs: "100%", sm: "35%"} , p: 4, boxSizing: 'border-box' }}>
            <img src={logo} alt='logo' style={{ width: '6.5rem', marginBottom: 10 }} />
            <Typography sx={{ color: 'white', fontSize: '14px', display: { xs: 'none', sm: 'block' } }}>
              All the Pokémon data you'll ever need in one place, easily accessible through a modern RESTful API.
            </Typography>
          </Box>

          <Box
            sx={{
              width: '65%',
              p: {xs: 0, sm:4},
              paddingBottom: {xs: 2, sm:0},
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: {xs: "center", sm:'flex-start'},
            }}
          >
            {pages.map((link) => (
              <FooterLink key={link.to} to={link.to}>
                {link.label}
               </FooterLink>
            ))}
          </Box>
        </Container>

        <Box sx={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
          <Typography sx={{ fontSize: '11px', paddingBottom: 2 }}>
            &copy; 2023 Pokemon Inc. All Rights Reserved.
          </Typography>{' '}
        </Box>
      </Box>
    </>
  );
}

export default Footer;