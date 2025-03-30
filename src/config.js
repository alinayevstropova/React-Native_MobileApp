import { Platform } from 'react-native';
import Constants from 'expo-constants';

const config = {
  // Application settings (not sensitive data!)
  appName: 'Black Hole',
  defaultLanguage: 'ru',
  // ... other app-wide configurations
};

/**
 * Determines the base URL for API requests. This is important for development
 * as the URL may differ between running on a real device, emulator, or in a web browser.
 * * - If running in development (__DEV__ is true):
 * - On Android (and if not using 127.0.0.1 which can have issues), it tries to use
 * a dynamically determined URL from Expo.  If not found, it falls back
 * to the Android emulator's loopback address (10.0.2.2).
 * - On other platforms, it constructs a URL using the hostname and port from Expo's
 * dev server if available, otherwise defaults to localhost:3000.
 * - If running in production (__DEV__ is false), it uses a pre-defined production URL.
 * * You might want to get variables through an environment system 
 * such as using a ".env" file instead of Expo's extra config.
 * * @returns {string} The base URL for API requests.
 */
export const API_URL = (() => {
  if (__DEV__) {
    if (Platform.OS === 'android' && !Constants.expoConfig?.hostUri?.includes('127.0.0.1')) {
      return Constants.expoConfig?.extra?.ANDROID_DEV_API_URL || 'http://10.0.2.2:3000';
    } else {
      const hostUri = Constants.expoConfig?.hostUri;
      const parsedUrl = hostUri ? new URL(hostUri) : null;
      const host = parsedUrl ? parsedUrl.hostname : 'localhost';
      const port = parsedUrl ? parsedUrl.port : '3000';
      return Constants.expoConfig?.extra?.DEV_API_URL || `http://${host}:${port}`;
    }
  } else {
    return Constants.expoConfig?.extra?.PROD_API_URL || 'https://your-production-api.com';
  }
})();

export default config; // Export the general config object

// Example Usage (in other files):
// import config, { API_URL } from './config';
// console.log(config.appName);
// console.log(API_URL);