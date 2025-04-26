import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next'; // If you're using react-i18next

/**
 * Компонент отображает прогресс уровня в виде кругового индикатора.
 * @param {Object} props - Свойства компонента
 * @param {number} props.level - Уровень пользователя
 * @param {number} props.currentDistance - Текущее пройденное расстояние
 * @param {number} props.nextLevelDistance - Расстояние, необходимое для достижения следующего уровня
 * @returns {JSX.Element} - Компонент прогресса уровня
 */
const LevelProgress = ({ level, currentDistance, nextLevelDistance }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  // Вычисляем процент выполнения прогресса
  const progress = (currentDistance / nextLevelDistance) * 100;

  return (
    <View style={styles.container}>
      {/* Круговой индикатор прогресса */}
      <CircularProgress
        value={progress}
        maxValue={100}
        radius={60}
        activeStrokeColor={theme.colors.neon} // Цвет активной окружности
        inActiveStrokeColor={theme.colors.darkGray} // Цвет неактивной окружности
        title={t('level', { level })} // Локализованный текст уровня
        titleColor={theme.colors.text} // Цвет заголовка (уровень)
        titleStyle={styles.title} // Стиль для заголовка
        valueSuffix="%" // Суффикс процента
        valueSuffixTextStyle={styles.text} // Стиль для текста процента
        progressValueStyle={styles.text} // Стиль для отображаемого процента
        activeStrokeWidth={8} // Толщина активной окружности
        inActiveStrokeWidth={8} // Толщина неактивной окружности
      />
      
      {/* Отображение текущего прогресса */}
      <Text style={[styles.text, { color: theme.colors.text }]}>
        {currentDistance.toFixed(2)} / {nextLevelDistance.toFixed(2)} km
      </Text>
    </View>
  );
};

// Стили для компонента
const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Центрируем все элементы
    justifyContent: 'center',
    padding: 20, // Добавим отступы для лучшего восприятия
  },
  text: {
    marginTop: 15, // Отступ от прогресс-бара
    fontSize: 16, // Размер шрифта
    fontWeight: 'bold', // Жирный шрифт для текста
    textAlign: 'center', // Центрирование текста
  },
  title: {
    fontWeight: 'bold', // Жирный шрифт для заголовка
    fontSize: 18, // Размер шрифта заголовка
  },
});

export default LevelProgress;
