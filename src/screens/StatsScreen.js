import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { AppContext } from '../context/AppContext'; // Import AppContext
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';


const StatsScreen = () => {
  const { theme } = useTheme();
  const { totalDistance, user } = useContext(AppContext); // Access totalDistance and user from context

  // Placeholder for other stats - replace with actual data
  const otherStats = [
    { label: 'longestSession', value: '12.5 km' }, // Example
    { label: 'averageSpeed', value: '5.2 km/h' }, // Example
    { label: 'holesEaten', value: '42' }, // Example
    // Add more stats...
  ];

  return (
    <ImageBackground
      source={require('../../assets/stats_bg.jpg')} // Replace with your background image
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
              'stats'
            </Text>

            <View style={styles.statCard}>
              <Text style={[styles.statLabel, { color: theme.text }]}>
                'totalDistance'
              </Text>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {(totalDistance / 1000).toFixed(2)} km
              </Text>
            </View>

            {otherStats.map((stat, index) => (
              <View style={styles.statCard} key={index}>
                <Text style={[styles.statLabel, { color: theme.text }]}>
                  {stat.label}
                </Text>
                <Text style={[styles.statValue, { color: theme.text }]}>
                  {stat.value}
                </Text>
              </View>
            ))}

            {user && (
              <View style={styles.statCard}>
                <Text style={[styles.statLabel, { color: theme.text }]}>
                  'username'
                </Text>
                <Text style={[styles.statValue, { color: theme.text }]}>
                  {user.username}
                </Text>
              </View>
            )}
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
  statCard: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '80%',
  },
  statLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
  },
});

export default StatsScreen;