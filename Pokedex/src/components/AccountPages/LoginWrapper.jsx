import React, { useState } from 'react';
import LogIn from './LogIn';
import UserPage from './UserPage';

function LoginWrapper() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      {isLogged ? (
        <UserPage setIsLogged={setIsLogged} />
      ) : (
        <LogIn setIsLogged={setIsLogged} />
      )}
    </>
  );
}

export default LoginWrapper;