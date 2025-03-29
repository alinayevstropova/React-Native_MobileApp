import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export async function saveRoute(route) {
  try {
    const jsonValue = JSON.stringify(route);
    await AsyncStorage.setItem('userRoute', jsonValue);
  } catch (error) {
    console.error('Ошибка сохранения маршрута:', error);
    Alert.alert('Ошибка сохранения маршрута', error.message);
    throw error; // Rethrow the error so that the caller can handle it
  }
}

export async function getRoute() {
  try {
    const jsonValue = await AsyncStorage.getItem('userRoute');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Ошибка загрузки маршрута:', error);
    Alert.alert('Ошибка загрузки маршрута', error.message);
    throw error; // Rethrow the error so that the caller can handle it
  }
}

export async function saveUser(user) {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (error) {
    console.error('Ошибка сохранения пользователя:', error);
    Alert.alert('Ошибка сохранения пользователя', error.message);
    throw error; // Rethrow the error
  }
}

export async function getUser() {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Ошибка загрузки пользователя:', error);
    Alert.alert('Ошибка загрузки пользователя', error.message);
    return null; // Return null in case of error
  }
}

export async function removeUser() {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error('Ошибка удаления пользователя:', error);
    Alert.alert('Ошибка удаления пользователя', error.message);
  }
}

export async function saveToken(token) {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Ошибка сохранения токена:', error);
    Alert.alert('Ошибка сохранения токена', error.message);
    throw error;
  }
}

export async function getToken() {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('Ошибка загрузки токена:', error);
    Alert.alert('Ошибка загрузки токена', error.message);
    return null;
  }
}

export async function removeToken() {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error('Ошибка удаления токена:', error);
    Alert.alert('Ошибка удаления токена', error.message);
  }
}