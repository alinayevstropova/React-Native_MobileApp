import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook

const SettingsToggle = ({ label, value, onToggle }) => {
  const { theme } = useTheme(); // Access the current theme

  return (
    <View style={styles.container}>
      <Text style={[styles.label, theme.text]}>{label}</Text>
      <TouchableOpacity onPress={onToggle}>
        <Icon
          name={value ? 'toggle-on' : 'toggle-off'}
          size={30}
          color={value ? '#00FF00' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%', // Adjust width as needed
    marginBottom: 20, // Adjust spacing as needed
  },
  label: {
    fontSize: 18,
  },
});

export default SettingsToggle;