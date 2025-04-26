import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '../themes';

// 1. Создание контекста для темы
export const ThemeContext = createContext({
  theme: darkTheme, // Тема по умолчанию
  toggleTheme: () => {}, // Заглушка для типа
});

// 2. Кастомный хук для использования контекста темы
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 3. Провайдер для управления темой
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null); // Изначально null, чтобы дождаться загрузки
  const [isLoading, setIsLoading] = useState(true); // Флаг загрузки темы

  // Функция для загрузки сохраненной темы из AsyncStorage
  const loadTheme = useCallback(async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('appTheme');
      if (storedTheme) {
        setTheme(storedTheme === 'dark' ? darkTheme : lightTheme);
      } else {
        setTheme(darkTheme); // Устанавливаем дефолтную тему, если нет сохраненной
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false); // Завершаем загрузку
    }
  }, []);

  // Функция для переключения темы
  const toggleTheme = useCallback(async () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === darkTheme ? lightTheme : darkTheme;
      AsyncStorage.setItem('appTheme', newTheme === darkTheme ? 'dark' : 'light'); // Сохраняем сразу
      return newTheme;
    });
  }, []);

  // Загружаем тему при монтировании
  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  // Если тема еще загружается, не рендерим контекст (чтобы избежать глюков)
  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
