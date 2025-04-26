import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import enTranslation from '../locales/en/translation.json';
import ruTranslation from '../locales/ru/translation.json';

const initializeI18n = async () => {
  let savedLang = 'ru'; // Язык по умолчанию

  try {
    const storedSettings = await AsyncStorage.getItem('settings');
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      if (parsedSettings.language) {
        savedLang = parsedSettings.language;
      }
    }
  } catch (error) {
    console.error('Error loading language from AsyncStorage:', error);
  }

  if (!i18n.isInitialized) {
    i18n
      .use(initReactI18next)
      .init({
        fallbackLng: 'en',
        lng: savedLang, // Устанавливаем язык только при первой инициализации
        debug: true,
        resources: {
          en: { translation: enTranslation },
          ru: { translation: ruTranslation },
        },
        interpolation: { escapeValue: false },
      });
  }
};

// Запускаем инициализацию i18n
initializeI18n();

export default i18n;
