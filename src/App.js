import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import './utils/i18n'; // Инициализация i18n
import { I18nextProvider } from 'react-i18next'; // Обертка с I18nextProvider
import i18n from './utils/i18n'; // Подключение конфигурации i18n

export default function App() {
  return (
    // Оборачиваем все приложение в провайдеры для доступа к состоянию и теме
    <ThemeProvider>
      <AppProvider>
        {/* I18nextProvider оборачивает все приложение для поддержки многокоточности */}
        <I18nextProvider i18n={i18n}>
          {/* NavigationContainer для работы с навигацией */}
          <NavigationContainer>
            {/* Основной навигатор приложения */}
            <AppNavigator />
          </NavigationContainer>
        </I18nextProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
