import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import MenuScreen from '../screens/MenuScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SkillsScreen from '../screens/SkillsScreen';
import StatsScreen from '../screens/StatsScreen';
import { AppContext } from '../context/AppContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="Menu"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          const iconMap = {
            Map: focused ? 'map-marker' : 'map-pin',
            Menu: focused ? 'bars' : 'navicon',
            Settings: focused ? 'gear' : 'gear',
            Skills: focused ? 'bolt' : 'bolt',
            Stats: focused ? 'line-chart' : 'bar-chart',
          };

          iconName = iconMap[route.name] || 'question';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.neon,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarStyle: {
          backgroundColor: theme.colors.bottomMenu,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // Android shadow
        },
        tabBarLabelStyle: {
          color: theme.colors.text,
          fontWeight: 'bold',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ title: t('map') }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{ title: t('menu') }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t('settings') }}
      />
      <Tab.Screen
        name="Skills"
        component={SkillsScreen}
        options={{ title: t('skills') }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{ title: t('stats') }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      {/* You can add other screens here that are not part of the bottom tabs */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
