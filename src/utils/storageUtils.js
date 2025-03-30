import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
 // Import i18n for localization

const STORAGE_PREFIX = 'BlackHole_'; // Prefix to avoid key collisions

/**
 * Saves a route to AsyncStorage, associated with a user ID.
 * @param {string} userId - The ID of the user.
 * @param {Array<object>} route - An array of route coordinates (objects with latitude and longitude).
 * @returns {Promise<void>}
 */
export async function saveRoute(userId, route) {
  try {
    const jsonValue = JSON.stringify(route);
    await AsyncStorage.setItem(`${STORAGE_PREFIX}route_${userId}`, jsonValue);
  } catch (error) {
    console.error('Error saving route:', error);
    Alert.alert(
      'routeSaveError',
      'failedToSaveRoute' + error.message, // More specific error message
    );
    throw error;
  }
}

/**
 * Retrieves a route from AsyncStorage, associated with a user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array<object>|null>} An array of route coordinates or null if no route is found.
 */
export async function getRoute(userId) {
  try {
    const jsonValue = await AsyncStorage.getItem(`${STORAGE_PREFIX}route_${userId}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading route:', error);
    Alert.alert(
      'routeLoadError',
      'failedToLoadRoute' + error.message, // More specific error message
    );
    throw error;
  }
}

/**
 * Saves user data to AsyncStorage.
 * @param {object} user - The user data object.
 * @returns {Promise<void>}
 */
export async function saveUser(user) {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem(`${STORAGE_PREFIX}user`, jsonValue);
  } catch (error) {
    console.error('Error saving user:', error);
    Alert.alert(
      'userSaveError',
      'failedToSaveUser' + error.message, // More specific error message (ADD to your locale files)
    );
    throw error;
  }
}

/**
 * Retrieves user data from AsyncStorage.
 * @returns {Promise<object|null>} The user data object or null if no user data is found.
 */
export async function getUser() {
  try {
    const jsonValue = await AsyncStorage.getItem(`${STORAGE_PREFIX}user`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading user:', error);
    Alert.alert(
      'userLoadError',
      'failedToLoadUser' + error.message, // More specific error message (ADD to your locale files)
    );
    return null;
  }
}

/**
 * Removes user data from AsyncStorage.
 * @returns {Promise<void>}
 */
export async function removeUser() {
  try {
    await AsyncStorage.removeItem(`${STORAGE_PREFIX}user`);
  } catch (error) {
    console.error('Error removing user:', error);
    Alert.alert(
      'userRemoveError',
      'failedToRemoveUser' + error.message, // More specific error message (ADD to your locale files)
    );
  }
}

/**
 * Saves a token to AsyncStorage.
 * @param {string} token - The authentication token.
 * @returns {Promise<void>}
 */
export async function saveToken(token) {
  try {
    await AsyncStorage.setItem(`${STORAGE_PREFIX}token`, token);
  } catch (error) {
    console.error('Error saving token:', error);
    Alert.alert(
      'tokenSaveError',
      'failedToSaveToken' + error.message, // More specific error message (ADD to your locale files)
    );
    throw error;
  }
}

/**
 * Retrieves a token from AsyncStorage.
 * @returns {Promise<string|null>} The authentication token or null if no token is found.
 */
export async function getToken() {
  try {
    const token = await AsyncStorage.getItem(`${STORAGE_PREFIX}token`);
    return token;
  } catch (error) {
    console.error('Error loading token:', error);
    Alert.alert(
      'tokenLoadError',
      'failedToLoadToken' + error.message, // More specific error message (ADD to your locale files)
    );
    return null;
  }
}

/**
 * Removes a token from AsyncStorage.
 * @returns {Promise<void>}
 */
export async function removeToken() {
  try {
    await AsyncStorage.removeItem(`${STORAGE_PREFIX}token`);
  } catch (error) {
    console.error('Error removing token:', error);
    Alert.alert(
      'tokenRemoveError',
      'failedToRemoveToken' + error.message, // More specific error message (ADD to your locale files)
    );
  }
}