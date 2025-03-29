import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import * as Animatable from 'react-native-animatable';
import { darkTheme } from '../themes';

export default function LevelProgress({ level, experience, nextLevelExperience }) {
  const progress = (experience / nextLevelExperience) * 100;

  return (
    <Animatable.View
      style={styles.container}
      animation="fadeIn"
      duration={1000}
    >
      <CircularProgress
        value={progress}
        maxValue={100}
        radius={60}
        activeStrokeColor="#00FFFF"
        inActiveStrokeColor="#333"
        title={`Уровень ${level}`}
        titleColor="#FFF"
        titleStyle={darkTheme.title}
        valueSuffix="%"
        valueSuffixTextStyle={darkTheme.text}
        progressValueStyle={darkTheme.text}
        activeStrokeWidth={8}
        inActiveStrokeWidth={8}
      />
      <Text style={[styles.text, darkTheme.text]}>
        {experience} / {nextLevelExperience} XP
      </Text>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});