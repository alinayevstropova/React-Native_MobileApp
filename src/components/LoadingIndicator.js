import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LoadingIndicator = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 360,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { iterations: -1 }
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  }, [rotation, opacity]);

  const animatedStyle = {
    transform: [{ rotate: rotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }],
    opacity,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, animatedStyle]}>
        <LinearGradient colors={['#00FFFF', '#333']} style={styles.gradient} />
      </Animated.View>

      <Animated.View style={[styles.circle, animatedStyle]}>
        <LinearGradient colors={['#333', '#00FFFF']} style={styles.gradient} />
      </Animated.View>

      <Animated.View style={[styles.circle, animatedStyle]}>
        <LinearGradient colors={['#00FFFF', '#333']} style={styles.gradient} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  gradient: {
    flex: 1,
    borderRadius: 15,
  },
});

export default LoadingIndicator;