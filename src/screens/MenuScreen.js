import React from 'react';
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
import { useTheme } from '../context/ThemeContext'; // Import useTheme


const MenuScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme(); // Access the current theme

  return (
    <ImageBackground
      source={require('../../assets/home_bg.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.8 }} // Adjust opacity for better text visibility
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)']}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Animatable.Text
            style={[styles.title, { color: theme.text }]} // Apply theme text color
            animation="fadeInDown"
            duration={1500}
          >
            'appTitle'
          </Animatable.Text>

          <Animatable.Text
            style={[styles.text, { color: theme.text }]} // Apply theme text color
            animation="fadeInUp"
            duration={1500}
            delay={500}
          >
            'exploreWithUs'
          </Animatable.Text>

          <Animatable.View
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
          >
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: 'rgba(0,0,0,0.7)', // Slightly transparent Dark Grey
                  borderWidth: 2,
                  borderColor: '#00FF00',
                },
              ]}
              onPress={() => navigation.navigate('Map')}
            >
              <Text style={[styles.buttonText, { color: '#00FF00' }]}>
                'startAdventure'
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 30,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Replaced with inline style
    // borderWidth: 2,                        // Replaced with inline style
    // borderColor: '#00FFFF',              // Replaced with inline style
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: '#00FFFF',                   // Replaced with inline style
    textShadowColor: '#00FF00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default MenuScreen;