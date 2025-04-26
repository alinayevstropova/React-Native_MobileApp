import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SettingsToggle = ({ label, value, onToggle }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: theme.colors.switchTrackFalse, true: theme.colors.switchTrackTrue }}
        thumbColor={value ? theme.colors.switchThumbActive : theme.colors.switchThumbInactive}
        ios_backgroundColor={theme.colors.switchTrackFalse}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SettingsToggle;
