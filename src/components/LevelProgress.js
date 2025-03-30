import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook
 // Import i18n for localization

const LevelProgress = ({ level, currentDistance, nextLevelDistance }) => {
  const { theme } = useTheme(); // Access the current theme
  const progress = (currentDistance / nextLevelDistance) * 100;

  return (
    <View style={styles.container}>
      <CircularProgress
        value={progress}
        maxValue={100}
        radius={60}
        activeStrokeColor="#00FF00"
        inActiveStrokeColor="#333"
        title={`$'level' ${level}`} // Localize "Level"
        titleColor="#FFF"
        titleStyle={[styles.title, theme.text]} // Apply theme text style
        valueSuffix="%"
        valueSuffixTextStyle={[styles.text, theme.text]} // Apply theme text style
        progressValueStyle={[styles.text, theme.text]} // Apply theme text style
        activeStrokeWidth={8}
        inActiveStrokeWidth={8}
      />
      <Text style={[styles.text, theme.text]}>
        {currentDistance.toFixed(2)} / {nextLevelDistance.toFixed(2)} km
      </Text>
    </View>
  );
};

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
  title: {
    fontWeight: 'bold',
  },
});

export default LevelProgress;