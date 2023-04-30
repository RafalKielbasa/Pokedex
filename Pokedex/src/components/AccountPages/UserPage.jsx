import React from 'react';
import Button from '@mui/material/Button';

function UserPage({ setIsLogged}) {

  const handleLogoutClick = () => {
    setIsLogged(false);
 
  }

  return (
    <>
      <div>UserPage</div>
      <Button onClick={handleLogoutClick}>Wyloguj</Button>
    </>
  )
}

export default UserPage;