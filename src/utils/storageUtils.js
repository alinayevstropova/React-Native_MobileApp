import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

const STORAGE_PREFIX = 'BlackHole_';

/**
 * Utility functions for interacting with AsyncStorage.
 */

/**
 * Hook to save data to AsyncStorage.
 * @returns {(key: string, value: any) => Promise<void>} - Function to save data.
 */
export function useSaveData() {
  const { t } = useTranslation();

  return useCallback(async (key, value) => {
    const prefixedKey = `${STORAGE_PREFIX}${key}`;

      console.log(`💾 saveData called with key: ${prefixedKey} and value:`, JSON.stringify(value));
      try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(prefixedKey, jsonValue);
          console.log(`💾 saveData: Saved key: ${prefixedKey}, value: ${jsonValue}`);
      } catch (error) {
          console.error(`💾 saveData: Error saving data for key ${prefixedKey}:`, error);
          console.error(error);
          Alert.alert(
              t('error'),
              `${t('failedToSaveData')}: ${error.message}`,
          );
          throw error;
      }
  }, [t]);
}

/**
 * Hook to get data from AsyncStorage.
 * @returns {(key: string) => Promise<any | null>} - Function to get data.
 */
export function useGetData() {
  const { t } = useTranslation();

  return useCallback(async (key) => {
    const prefixedKey = `${STORAGE_PREFIX}${key}`;

      
      try {
        console.log(`📂 getData called with key: ${STORAGE_PREFIX}${key}`);
          const jsonValue = await AsyncStorage.getItem(prefixedKey);
          console.log(`📂 getData: Retrieved key: ${prefixedKey}, value: ${jsonValue}`);
          return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (error) {
          console.error(`📂 getData: Error loading data for key ${prefixedKey}:`, error);
          console.error(error);
          Alert.alert(
              t('error'),
              `${t('failedToLoadData')}: ${error.message}`,
          );
          return null;
      }
  }, [t]);
}

/**
 * Hook to remove data from AsyncStorage.
 * @returns {(key: string) => Promise<void>} - Function to remove data.
 */
export function useRemoveData() {
  const { t } = useTranslation();

  return useCallback(async (key) => {
    try {
      // Use the correct prefix for keys
      await AsyncStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    } catch (error) {
      console.error(`Error removing data for key ${key}:`, error);
      Alert.alert(
        t('error'),
        `${t('failedToRemoveData')}: ${error.message}`,
      );
    }
  }, [t]);
}

/**
 * Hook to clear all data from AsyncStorage (use with caution!).
 * @returns {() => Promise<void>} - Function to clear all data.
 */
export function useClearAllData() {
  const { t } = useTranslation();

  return useCallback(async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing all data:', error);
      Alert.alert(
        t('error'),
        `${t('failedToClearData')}: ${error.message}`,
      );
    }
  }, [t]);
}
