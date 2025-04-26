import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const BottomMenu = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t } = useTranslation(); // Используем локализацию

  const menuItems = [
    { route: 'Map', icon: 'map-marker', label: 'map' },
    { route: 'Menu', icon: 'bars', label: 'menu' },
    { route: 'Settings', icon: 'gear', label: 'settings' },
    { route: 'Skills', icon: 'bolt', label: 'skills' },
    { route: 'Stats', icon: 'line-chart', label: 'stats' },
  ];

  return (
    <View style={[styles.menuContainer, { backgroundColor: theme.colors.bottomMenu }]}>
      {menuItems.map(item => (
        <TouchableOpacity
          key={item.route}
          style={styles.menuItem}
          onPress={() => navigation.navigate(item.route)}
          activeOpacity={0.7} // Добавлен эффект нажатия
        >
          <Icon name={item.icon} size={24} color={theme.colors.neon} />
          <Text style={[styles.menuText, { color: theme.colors.neon }]}>
            {t(item.label)} {/* Локализованный текст */}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopLeftRadius: 10, // Закругленные углы для лучшего визуального восприятия
    borderTopRightRadius: 10, // Закругленные углы для лучшего визуального восприятия
    elevation: 5, // Тень для андроидных устройств
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    flex: 1, // Разделяет элементы по всему экрану
  },
  menuText: {
    fontSize: 12, // Меньший шрифт для компактного отображения
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default BottomMenu;
