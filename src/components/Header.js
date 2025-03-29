import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';;
import * as Animatable from 'react-native-animatable';
import { darkTheme } from '../themes';

export default function Header({ title, style, textStyle }) {
  return (
    <Animatable.View // Оборачиваем Header в Animatable.View
      animation="fadeInDown" // Добавляем анимацию появления сверху
      duration={1000} // Длительность анимации
    >
      <LinearGradient
        colors={['#333', '#000']} // Градиент от темно-серого к черному
        style={[styles.container, style]}
      >
        <Text style={[styles.title, darkTheme.title, textStyle]}>{title}</Text>
      </LinearGradient>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: '#00FFFF', // Неоновая тень
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});