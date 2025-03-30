import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
 // Import i18n for localization

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    language: 'ru', // Default language
    darkMode: false,
    notificationsEnabled: true,
    // ... other settings
  });
  const [totalDistance, setTotalDistance] = useState(0); // Track total distance

  useEffect(() => {
    const loadAppState = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        const storedSettings = await AsyncStorage.getItem('settings');
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }

        const storedDistance = await AsyncStorage.getItem('totalDistance');
        if (storedDistance) {
          setTotalDistance(parseFloat(storedDistance));
        }
      } catch (error) {
        console.error('Error loading app state:', error);
      }
    };

    loadAppState();
  }, []);

  useEffect(() => {
    const saveAppState = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem('user', JSON.stringify(user));
        }
        await AsyncStorage.setItem('settings', JSON.stringify(settings));
        await AsyncStorage.setItem('totalDistance', JSON.stringify(totalDistance));
        
      } catch (error) {
        console.error('Error saving app state:', error);
      }
    };

    saveAppState();
  }, [user, settings, totalDistance]);

  const contextValue = {
    user,
    setUser,
    settings,
    setSettings,
    totalDistance,
    setTotalDistance,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};