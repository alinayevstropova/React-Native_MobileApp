import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import SettingsToggle from '../components/SettingsToggle';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n';

const SettingsScreen = () => {
  const { settings, setSettings, setUser } = useContext(AppContext);
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [loadingLogout, setLoadingLogout] = useState(false); // Add loading state

  const handleLogout = async () => {
    setLoadingLogout(true); // Start loading

    try {
      // Perform any necessary cleanup or asynchronous logout tasks here
      setUser(null); // Clear user data in context
      navigation.navigate('Menu'); // Navigate to the main menu
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert(
        t('error'),
        `${t('logoutFailed')}: ${error.message}`, // Provide error message
      );
    } finally {
      setLoadingLogout(false); // Stop loading
    }
  };

  const handleLanguageChange = (lang) => {
    if (settings.language !== lang) {
      i18n.changeLanguage(lang);
      setSettings((prevSettings) => ({ ...prevSettings, language: lang }));
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/settings_bg.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.6 }}
    >
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animatable.View
            style={styles.container}
            animation="fadeIn"
            duration={1000}
          >
            <Text style={[styles.title, { color: theme.colors.title }]}>
              {t('settings')}
            </Text>

            <SettingsToggle
              label={t('notifications')}
              value={settings.notificationsEnabled}
              onToggle={() =>
                setSettings({
                  ...settings,
                  notificationsEnabled: !settings.notificationsEnabled,
                })
              }
            />

            <SettingsToggle
              label={t('darkMode')}
              value={settings.darkMode}
              onToggle={toggleTheme}
            />

            <View style={styles.settingItem}>
              <Text style={[styles.settingText, { color: theme.colors.text }]}>
                {t('language')}
              </Text>
              <View style={styles.languageButtons}>
                <TouchableOpacity
                  style={[
                    styles.languageButton,
                    settings.language === 'en' && styles.languageButtonActive,
                  ]}
                  onPress={() => handleLanguageChange('en')}
                  activeOpacity={0.8}
                  disabled={loadingLogout} // Disable during logout
                >
                  <Text style={[styles.languageButtonText, { color: theme.colors.text }]}>
                    {t('english')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.languageButton,
                    settings.language === 'ru' && styles.languageButtonActive,
                  ]}
                  onPress={() => handleLanguageChange('ru')}
                  activeOpacity={0.8}
                  disabled={loadingLogout} // Disable during logout
                >
                  <Text style={[styles.languageButtonText, { color: theme.colors.text }]}>
                    {t('russian')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.logoutButton, loadingLogout && styles.logoutButtonLoading]} // Apply loading style
              onPress={handleLogout}
              activeOpacity={0.8}
              disabled={loadingLogout} // Disable button while loading
            >
              {loadingLogout ? (
                <View style={styles.loadingIndicator}>
                  <ActivityIndicator size="small" color="#fff" />
                </View>
              ) : (
                <Text style={styles.logoutButtonText}>{t('logout')}</Text>
              )}
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
    fontWeight: 'bold',
    textAlign: 'center',
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
    textAlign: 'left',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#00FF00',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  languageButtonActive: {
    backgroundColor: '#00FF00',
  },
  languageButtonText: {
    fontWeight: 'bold',
    color: '#00FF00',
  },
  logoutButtonLoading: {
    backgroundColor: 'rgba(255, 0, 0, 0.5)', // Slightly lighter when loading
  },
  loadingIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingsScreen;
