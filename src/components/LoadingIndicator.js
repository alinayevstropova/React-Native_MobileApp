import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

/**
 * Компонент индикатора загрузки с анимацией вращающегося круга.
 * @returns {JSX.Element} - Индикатор загрузки с плавной анимацией.
 */
const LoadingIndicator = () => {
  const rotation = useRef(new Animated.Value(0)).current; // Анимация вращения
  const opacity = useRef(new Animated.Value(1)).current; // Анимация прозрачности
  const { theme } = useTheme(); // Используем контекст темы для получения цветов

  useEffect(() => {
    // Вращение круга
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 360,
        duration: 2000, // Время одного поворота
        easing: Easing.linear, // Плавная анимация
        useNativeDriver: true, // Используем нативные драйверы для повышения производительности
      }),
      { iterations: -1 },
    ).start();

    // Анимация изменения прозрачности
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 },
    ).start();
  }, [rotation, opacity]);

  // Стиль для анимаций
  const animatedStyle = {
    transform: [
      { rotate: rotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) },
    ],
    opacity, // Прозрачность для плавных изменений
  };

  return (
    <View style={styles.container}>
      {/* Первичный круг с анимацией */}
      <Animated.View style={[styles.circle, animatedStyle]}>
        <LinearGradient
          colors={[theme.colors.neon, theme.colors.darkGray]}
          style={styles.gradient}
        />
      </Animated.View>

      {/* Вторичный круг с анимацией */}
      <Animated.View style={[styles.circle, animatedStyle]}>
        <LinearGradient
          colors={[theme.colors.darkGray, theme.colors.neon]}
          style={styles.gradient}
        />
      </Animated.View>

      {/* Третий круг с анимацией */}
      <Animated.View style={[styles.circle, animatedStyle]}>
        <LinearGradient
          colors={[theme.colors.neon, theme.colors.darkGray]}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5, // Пространство между кругами
  },
  gradient: {
    flex: 1,
    borderRadius: 15,
  },
});

export default LoadingIndicator;
