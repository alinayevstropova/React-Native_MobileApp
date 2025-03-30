import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';
import MenuScreen from '../screens/MenuScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SkillsScreen from '../screens/SkillsScreen';
import StatsScreen from '../screens/StatsScreen';
import { AppContext } from '../context/AppContext';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useTheme } from '../context/ThemeContext'; // Import useTheme

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { settings } = useContext(AppContext);
  const { theme } = useTheme(); // Access the current theme

  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Map') {
            iconName = focused ? 'map-marker' : 'map-pin';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'bars' : 'navicon';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'gear' : 'gear';
          } else if (route.name === 'Skills') {
            iconName = focused ? 'bolt' : 'bolt';
          } else if (route.name === 'Stats') {
            iconName = focused ? 'line-chart' : 'bar-chart';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00FF00',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: theme.background, // Use theme background color
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          color: theme.text, // Use theme text color for labels
        },
        headerShown: false, // Hide headers for bottom tabs
      })}
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ title: 'map' }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{ title: 'menu' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'settings' }}
      />
      <Tab.Screen
        name="Skills"
        component={SkillsScreen}
        options={{ title: 'skills' }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{ title: 'stats' }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;