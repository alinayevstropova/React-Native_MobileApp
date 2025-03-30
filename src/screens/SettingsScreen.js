import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import SettingsToggle from '../components/SettingsToggle';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const { settings, setSettings, setUser } = useContext(AppContext);
  const { theme, toggleTheme } = useTheme(); // Access toggleTheme from context
  const navigation = useNavigation();

  const handleLogout = async () => {
    //  Clear user data and Navigate to Menu screen, but you may want to navigate to a login screen or similar
    setUser(null);
    navigation.navigate('Menu'); // Navigate to the main menu
  };

  const handleLanguageChange = (lang) => {
    setSettings({ ...settings, language: lang });
   
  };

  return (
    <ImageBackground
      source={require('../../assets/settings_bg.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.8 }} // Adjust opacity for better text visibility
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animatable.View
            style={styles.container}
            animation="fadeIn"
            duration={1000}
          >
            <Text style={[styles.title, { color: theme.text }]}>
              'settings'
            </Text>

            <SettingsToggle
              label='notifications'
              value={settings.notificationsEnabled}
              onToggle={() =>
                setSettings({
                  ...settings,
                  notificationsEnabled: !settings.notificationsEnabled,
                })
              }
            />

            <SettingsToggle
              label='darkMode'
              value={settings.darkMode}
              onToggle={toggleTheme} // Use the toggleTheme function from context
            />

            <View style={styles.settingItem}>
              <Text style={[styles.settingText, { color: theme.text }]}>
                'language'
              </Text>
              <View style={styles.languageButtons}>
                <TouchableOpacity
                  style={[
                    styles.languageButton,
                    settings.language === 'en' && styles.languageButtonActive,
                  ]}
                  onPress={() => handleLanguageChange('en')}
                >
                  <Text style={[styles.languageButtonText, { color: theme.text }]}>
                    English
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.languageButton,
                    settings.language === 'ru' && styles.languageButtonActive,
                  ]}
                  onPress={() => handleLanguageChange('ru')}
                >
                  <Text style={[styles.languageButtonText, { color: theme.text }]}>
                    Русский
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>'logout'</Text>
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 30,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  languageButtons: {
    flexDirection: 'row',
  },
  languageButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#00FF00',
  },
  languageButtonActive: {
    backgroundColor: '#00FF00',
  },
  languageButtonText: {
    color: '#00FF00',
  },
});

export default SettingsScreen;