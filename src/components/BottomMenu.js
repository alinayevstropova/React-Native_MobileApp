import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
 // Import i18n for localization

const BottomMenu = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Menu')}
      >
        <Icon name="bars" size={30} color="#00FF00" />
        <Text style={styles.menuText}>'menu'</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Settings')}
      >
        <Icon name="gear" size={30} color="#00FF00" />
        <Text style={styles.menuText}>'settings'</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Skills')}
      >
        <Icon name="bolt" size={30} color="#00FF00" />
        <Text style={styles.menuText}>'skills'</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Stats')}
      >
        <Icon name="line-chart" size={30} color="#00FF00" />
        <Text style={styles.menuText}>'stats'</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  menuItem: {
    alignItems: 'center', // Center icons and text vertically
    justifyContent: 'center', // Center icons and text horizontally
    paddingHorizontal: 20,
  },
  menuText: {
    color: '#00FF00',
    fontSize: 12,
    marginTop: 5,
  },
});

export default BottomMenu;