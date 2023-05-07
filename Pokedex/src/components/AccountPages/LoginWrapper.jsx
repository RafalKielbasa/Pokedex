import React, { useEffect, useState } from 'react';
import LogIn from './LogIn';
import UserPage from './UserPage';

function LoginWrapper() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    let logged = JSON.parse(localStorage.getItem("logged"));
    setIsLogged(logged)

  }, [])

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