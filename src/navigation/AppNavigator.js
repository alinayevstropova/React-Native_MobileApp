import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { AuthContext } from '../context/AuthContext';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { darkTheme } from '../themes';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Главная') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Карта') {
            iconName = focused ? 'map-marker' : 'map-marker';
          } else if (route.name === 'Профиль') {
            iconName = focused ? 'user' : 'user';
          } else if (route.name === 'Настройки') {
            iconName = focused ? 'gear' : 'gear';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00FFFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#121212', borderTopWidth: 0 }, // Убрали верхнюю границу
        headerStyle: { backgroundColor: '#121212', borderBottomWidth: 0 },
        headerTintColor: '#00FFFF',
        headerTitleStyle: { color: '#00FFFF' }
      })}
    >
      <Tab.Screen name="Главная" component={HomeScreen} />
      <Tab.Screen name="Карта" component={MapScreen} />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          headerRight: () => (user ? <Button title="Выйти" onPress={logout} /> : null),
        }}
      />
      <Tab.Screen name="Настройки" component={SettingsScreen} />
    </Tab.Navigator>
  );
}