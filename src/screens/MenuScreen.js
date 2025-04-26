import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const MenuScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const reverseCityLookup = async ({ latitude, longitude }) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      return res.data?.address?.city || res.data?.address?.town || res.data?.address?.village || null;
    } catch (error) {
      console.error("❌ Ошибка при обратном геокодинге:", error);
      return null;
    }
  };
  // Стили, которые зависят от темы, вынесены в useMemo для производительности
  const backgroundStyle = useMemo(() => ({
    flex: 1,
    resizeMode: 'cover',
  }), []);

  const gradientStyle = useMemo(() => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }), []);

  const containerStyle = useMemo(() => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }), []);

  const titleStyle = useMemo(() => ({
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.colors.title,
    textShadowColor: theme.colors.textShadowColor,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  }), [theme]);

  const buttonStyle = useMemo(() => ({
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.buttonBackground,
    borderWidth: theme.buttonBorderWidth,
    borderColor: theme.colors.buttonBorderColor,
    shadowColor: theme.colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }), [theme]);

  const buttonTextStyle = useMemo(() => ({
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.buttonText,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  }), [theme]);

  return (
    <ImageBackground
      source={require('../../assets/home_bg.jpg')}
      style={backgroundStyle}
      imageStyle={{ opacity: 0.8 }}
    >
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={gradientStyle}
      >
        <View style={containerStyle}>
          <Animatable.Text
            style={titleStyle}
            animation="fadeInDown"
            duration={1500}
          >
            {t('appTitle')}
          </Animatable.Text>

          <Animatable.Text
            style={[styles.text, { color: theme.colors.text }]}
            animation="fadeInUp"
            duration={1500}
            delay={500}
          >
            {t('exploreWithUs')}
          </Animatable.Text>

          <Animatable.View
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
          >
            <TouchableOpacity
              style={buttonStyle}
              onPress={() => navigation.navigate('Map')}
              activeOpacity={0.8}
            >
              <Text style={buttonTextStyle}>
                {t('startAdventure')}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 30,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MenuScreen;
