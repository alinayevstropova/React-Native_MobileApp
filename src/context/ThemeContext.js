import React, { createContext, useState, useContext, useEffect } from 'react';
import { darkTheme } from '../themes'; // Ensure the path is correct

// 1. Create the context
export const ThemeContext = createContext({
  theme: darkTheme, // Default theme
  setTheme: () => {}, // Dummy function for type safety
});

// 3. Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 2. Create the provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(darkTheme); // Initialize with darkTheme

  // You might want to persist the theme in AsyncStorage, for example:
  useEffect(() => {
    //  AsyncStorage logic here to get and set the theme (if desired)
    //  Example:
    //  const loadTheme = async () => {
    //    const storedTheme = await AsyncStorage.getItem('appTheme');
    //    if (storedTheme) {
    //      // Logic to switch between themes based on storedTheme value
    //      setTheme(darkTheme); // Or setTheme(lightTheme) if you have one
    //    }
    //  };
    //  loadTheme();
  }, []);

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}