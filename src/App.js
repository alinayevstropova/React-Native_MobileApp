import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { ThemeContext } from './context/ThemeContext'; // Import ThemeContext
import { darkTheme } from './themes'; // Import the dark theme

export default function App() {
  const [theme, setTheme] = useState(darkTheme); // Initialize with darkTheme

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <AuthProvider>
        <LocationProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </LocationProvider>
      </AuthProvider>
    </ThemeContext.Provider>
  );
}