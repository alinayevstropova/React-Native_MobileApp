import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { URL } from 'react-native-url-polyfill';

const getApiUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android' && !Constants.expoConfig?.hostUri?.includes('127.0.0.1')) {
      return Constants.expoConfig?.extra?.ANDROID_DEV_API_URL || 'http://10.0.2.2:3000';
    } else {
      const hostUri = Constants.expoConfig?.hostUri;
      const parsedUrl = hostUri ? new URL(hostUri) : null;
      const host = parsedUrl ? parsedUrl.hostname : 'localhost';
      const port = parsedUrl ? parsedUrl.port : '3000';
      return Constants.expoConfig?.extra?.DEV_API_URL || `http://<span class="math-inline">\{host\}\:</span>{port}`;
    }
  } else {
    return Constants.expoConfig?.extra?.PROD_API_URL || 'https://your-production-api.com';
  }
};

export const API_URL = getApiUrl();

export const config = {
  // Other config (if any)
};

//  Access other variables directly where needed:
//  const FIREBASE_API_KEY = Constants.expoConfig?.extra?.FIREBASE_API_KEY;