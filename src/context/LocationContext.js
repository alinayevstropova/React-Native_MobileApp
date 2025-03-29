import React, { createContext, useState, useEffect } from 'react';
import { getCurrentLocation } from '../services/locationService';
import { Alert } from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';

export const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLocationData = async () => {
    setLoading(true);
    try {
      const loc = await getCurrentLocation();
      if (loc) {
        setLocation(loc);
      } else {
        setErrorMsg('Не удалось получить местоположение.');
        Alert.alert('Ошибка местоположения', 'Не удалось получить местоположение. Убедитесь, что геолокация включена.');
      }
    } catch (error) {
      setErrorMsg(error.message);
      Alert.alert('Ошибка местоположения', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocationData(); // Получаем местоположение при монтировании
  }, []);

  const locationContextValue = {
    location,
    fetchLocation: fetchLocationData, // Используем функцию с обработкой ошибок
    errorMsg,
    loading,
  };

  return (
    <LocationContext.Provider value={locationContextValue}>
      {loading ? <LoadingIndicator /> : children}
    </LocationContext.Provider>
  );
}