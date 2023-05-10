import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <LoginContext.Provider value={{ userData, setUserData }}>
      {children}
    </LoginContext.Provider>
  );
};
