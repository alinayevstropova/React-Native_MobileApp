import { Platform } from 'react-native';
import Constants from 'expo-constants';

const config = {
  // Application settings (not sensitive data!)
  appName: 'Black Hole',
  defaultLanguage: 'ru',
  // ... other app-wide configurations
};

export const API_URL = (() => {
  if (__DEV__) {
    if (Platform.OS === 'android' && !Constants.expoConfig?.hostUri?.includes('127.0.0.1')) {
      // Use extra.android.devApiUrl for clarity and consistency
      return Constants.expoConfig?.extra?.android?.devApiUrl || 'http://10.0.2.2:3000';
    } else {
      const hostUri = Constants.expoConfig?.hostUri;
      const parsedUrl = hostUri ? new URL(hostUri) : null;
      const host = parsedUrl ? parsedUrl.hostname : 'localhost';
      const port = parsedUrl ? parsedUrl.port : 3000;
      // Use extra.devApiUrl for clarity and consistency
      return Constants.expoConfig?.extra?.devApiUrl || `http://${host}:${port}`;
    }
  } else {
    // Use extra.prodApiUrl for clarity and consistency
    return Constants.expoConfig?.extra?.prodApiUrl || 'https://your-production-api.com';
  }
})();

export default config; 
