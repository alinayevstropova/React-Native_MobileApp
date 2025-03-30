import React from 'react';
import { Polyline } from 'react-native-maps';
import { StyleSheet } from 'react-native';

const NeonPolyline = ({ coordinates, strokeColor, strokeWidth }) => {
  return (
    <Polyline
      coordinates={coordinates}
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
      lineCap="round"
      lineJoin="round"
      geodesic={true}
      style={styles.polyline} // Apply stylesheet
    />
  );
};

const styles = StyleSheet.create({
  polyline: {
    // Add any specific styles you want to apply to the polyline here.
    // For example, you can add shadow effects for a glowing effect (complex).
    // Note: Shadow effects are limited in React Native Maps, especially on Android.
  },
});

export default NeonPolyline;