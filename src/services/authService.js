import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const MOCKED_USER = { username: 'testuser' }; // Фиктивный пользователь

export async function login(username, password) {
  if (username === 'test' && password === 'test') {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(MOCKED_USER));
      return { success: true, user: MOCKED_USER };
    } catch (error) {
      Alert.alert('Ошибка', 'Ошибка сохранения пользователя');
      return { success: false, message: 'Ошибка сохранения пользователя' };
    }
  } else {
    Alert.alert('Ошибка', 'Неверный логин или пароль');
    return { success: false, message: 'Неверный логин или пароль' };
  }
}

export async function logout() {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    Alert.alert('Ошибка', 'Ошибка выхода');
  }
}

export async function getLoggedInUser() {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    Alert.alert('Ошибка', 'Ошибка при получении пользователя');
    return null;
  }
}