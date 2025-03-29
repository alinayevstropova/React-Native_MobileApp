import { Alert } from 'react-native';

const MOCKED_LOCATION = {
  latitude: 40.7128,
  longitude: -74.0060,
}; // Координаты Нью-Йорка

export async function getCurrentLocation() {
  return MOCKED_LOCATION; // Возвращаем фиктивные координаты
}