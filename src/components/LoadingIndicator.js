import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

export default function LoadingIndicator() {
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1
    );

    opacity.value = withRepeat(
      withTiming(0.5, { duration: 1000, easing: Easing.ease }, () => {
        opacity.value = withTiming(1, { duration: 1000, easing: Easing.ease });
      }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    opacity: opacity.value,
  }));

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
}

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
