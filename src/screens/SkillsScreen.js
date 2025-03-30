import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';


const SkillsScreen = () => {
  const { theme } = useTheme();

  // Placeholder for skills data - replace with actual data
  const skills = [
    { name: 'skillSpeed', description: 'skillSpeedDesc', level: 2 },
    { name: 'skillRange', description: 'skillRangeDesc', level: 1 },
    {
      name: 'skillGravity',
      description: 'skillGravityDesc',
      level: 3,
    },
    // Add more skills...
  ];

  return (
    <ImageBackground
      source={require('../../assets/skills_bg.jpg')} // Replace with your background image
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.8 }}
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
              'skills'
            </Text>

            {skills.map((skill, index) => (
              <View style={styles.skillCard} key={index}>
                <Text style={[styles.skillName, { color: theme.text }]}>
                  {skill.name} (Lv. {skill.level})
                </Text>
                <Text style={[styles.skillDescription, { color: theme.text }]}>
                  {skill.description}
                </Text>
              </View>
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
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skillCard: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '80%',
  },
  skillName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  skillDescription: {
    fontSize: 16,
  },
});

export default SkillsScreen;