import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { AppProvider } from './context/AppContext'; // Import AppProvider
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider

export default function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </AppProvider>
  );
}