import { createContext, useEffect } from 'react';
import { theme } from '../components/Theme/Theme';
import { useState } from 'react';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('isDarkMode');
    return storedMode ? JSON.parse(storedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const currentTheme = isDarkMode ? theme.dark : theme.light;
  const changeTheme = () => setDarkMode((prev) => !prev);

  console.log(isDarkMode);

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
