import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { darkTheme } from '../themes';
import * as Animatable from 'react-native-animatable'; // Для анимаций

export default function CustomButton({ title, onPress, style, textStyle }) {
  return (
    <Animatable.View // Оборачиваем кнопку в Animatable.View
      animation="pulse" // Добавляем анимацию пульсации
      easing="ease-out"
      iterationCount="infinite"
    >
      <TouchableOpacity style={[styles.button, darkTheme.button, style]} onPress={onPress}>
        <Text style={[styles.text, darkTheme.buttonText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#00FFFF', // Неоновый контур
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});