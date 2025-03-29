import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import * as Animatable from 'react-native-animatable';
import { darkTheme } from '../themes';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/home_bg.jpg')} // Замените на путь к вашему фоновому изображению
      style={styles.backgroundImage}
    >
      <LinearGradient colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)']} style={styles.gradient}>
        <View style={styles.container}>
          <Animatable.Text
            style={[darkTheme.title, styles.title]}
            animation="fadeInDown"
            duration={1500}
          >
            RPG Explorer
          </Animatable.Text>

          <Animatable.Text
              style={[darkTheme.text, styles.text]}
              animation="fadeInUp"
              duration={1500}
              delay={500}
          >
              Исследуйте мир с нами!
          </Animatable.Text>

          <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
            <TouchableOpacity
              style={[styles.button, darkTheme.button]}
              onPress={() => navigation.navigate('Карта')}
            >
              <Text style={[styles.buttonText, darkTheme.buttonText]}>
                Начать приключение
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Чтобы изображение покрывало всю область
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    marginBottom: 30,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#00FFFF',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});