import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';

const SkillsScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch skills data (replace with actual data source)
  const fetchSkills = async () => {
    setLoading(true);
    // Simulate fetching data (use API call or data fetch here)
    await new Promise(resolve => setTimeout(resolve, 1000));
    const fetchedSkills = [
      { name: 'skillSpeed', description: 'skillSpeedDesc', level: 2 },
      { name: 'skillRange', description: 'skillRangeDesc', level: 1 },
      { name: 'skillGravity', description: 'skillGravityDesc', level: 3 },
    ];
    setSkills(fetchedSkills);
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.neon} />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/skills_bg.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.8 }}
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
              {t('skills')}
            </Text>

            {skills.map((skill, index) => (
              <Animatable.View
                key={index}
                animation="fadeInUp"
                duration={1000}
                delay={index * 100}
                style={styles.skillCard}
              >
                <Text style={[styles.skillName, { color: theme.colors.text }]}>
                  {t(skill.name)} (Lv. {skill.level})
                </Text>
                <Text style={[styles.skillDescription, { color: theme.colors.text }]}>
                  {t(skill.description)}
                </Text>
              </Animatable.View>
            ))}
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
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  skillCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  skillName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  skillDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SkillsScreen;
