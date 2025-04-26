import { useFormattedDistance } from './useFormattedDistance'; // Импортируем кастомный хук

const BASE_DISTANCE = 1000; // Базовое расстояние для уровня (в метрах)
const DISTANCE_MULTIPLIER = 1.5; // Множитель для увеличения расстояния
const INITIAL_LEVEL_DISTANCE = 1000; // Расстояние для достижения первого уровня (в метрах)

/**
 * Вычисление уровня пользователя на основе общего расстояния.
 * @param {number} totalDistance - Общее расстояние, пройденное пользователем, в метрах.
 * @returns {number} Уровень пользователя.
 */
export function calculateLevel(totalDistance) {
  if (totalDistance < INITIAL_LEVEL_DISTANCE) {
    return 1; // Возвращаем уровень 1, если пройденное расстояние меньше минимального для первого уровня.
  }
  return Math.floor(
    1 + Math.log(totalDistance / INITIAL_LEVEL_DISTANCE) / Math.log(DISTANCE_MULTIPLIER)
  );
}

/**
 * Вычисляет расстояние, которое нужно пройти для достижения следующего уровня.
 * @param {number} currentLevel - Текущий уровень пользователя.
 * @returns {number} Расстояние в метрах для достижения следующего уровня.
 */
export function calculateNextLevelDistance(currentLevel) {
  if (currentLevel < 1) {
    throw new Error('Текущий уровень должен быть хотя бы 1');
  }

  return INITIAL_LEVEL_DISTANCE * Math.pow(DISTANCE_MULTIPLIER, currentLevel - 1); // Используем Math.pow()
}

/**
 * Вычисляет процент выполнения от текущего уровня до следующего.
 * @param {number} currentDistance - Текущее пройденное расстояние.
 * @param {number} currentLevel - Текущий уровень пользователя.
 * @returns {number} Процент выполнения.
 */
export function getLevelProgress(currentDistance, currentLevel) {
  const currentLevelDistance = calculateNextLevelDistance(currentLevel);
  const nextLevelDistance = calculateNextLevelDistance(currentLevel + 1);

  if (nextLevelDistance - currentLevelDistance === 0) {
    return 100; // Возвращаем 100%, если расстояния для уровней одинаковы
  }

  return ((currentDistance - currentLevelDistance) / (nextLevelDistance - currentLevelDistance)) * 100;
}

/**
 * Генерирует строку с описанием расстояния до следующего уровня, с учетом локализации.
 * @param {number} distanceToNextLevel - Расстояние до следующего уровня в метрах.
 * @returns {string} Форматированная строка с расстоянием (например, "1.5 километра").
 */
export function formatDistanceToNextLevel(distanceToNextLevel) {
  return useFormattedDistance(distanceToNextLevel); // Используем кастомный хук
}
