import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [settings, setSettings] = useState({
        language: 'ru',
        darkMode: false,
        notificationsEnabled: true,
    });
    const { t } = useTranslation();

    const loadAppState = useCallback(async () => {
        try {
            const storedSettings = await AsyncStorage.getItem('settings');
            if (storedSettings) {
                const parsedSettings = JSON.parse(storedSettings);
                setSettings(parsedSettings);
                i18n.changeLanguage(parsedSettings.language); // Устанавливаем язык один раз
            }
        } catch (error) {
            console.error('Ошибка загрузки состояния:', error);
        }
    }, []);

    const saveAppState = useCallback(async () => {
        try {
            await AsyncStorage.setItem('settings', JSON.stringify(settings));
        } catch (error) {
            console.error('Ошибка сохранения состояния:', error);
        }
    }, [settings]);

    useEffect(() => {
        loadAppState();
    }, [loadAppState]);

    useEffect(() => {
        saveAppState();
    }, [saveAppState]);

    const toggleLanguage = () => {
        const newLanguage = settings.language === 'en' ? 'ru' : 'en';
        setSettings(prevSettings => ({ ...prevSettings, language: newLanguage }));
        i18n.changeLanguage(newLanguage); // Вызываем смену языка только здесь
    };

    return (
        <AppContext.Provider value={{ settings, setSettings, toggleLanguage }}>
            {children}
        </AppContext.Provider>
    );
};
