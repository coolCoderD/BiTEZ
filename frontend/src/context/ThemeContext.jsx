import React, { createContext, useContext, useState } from 'react';

// Create the ThemeContext
const ThemeContext = createContext();

// Create a custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component that wraps the app and provides theme state
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle("dark"); 
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <div>{children}</div>
    </ThemeContext.Provider>
  );
};
