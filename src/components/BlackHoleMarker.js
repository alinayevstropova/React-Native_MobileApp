import React from 'react';
import { Marker } from 'react-native-maps';
import { Image, StyleSheet } from 'react-native';

const BlackHoleMarker = ({ coordinate }) => {
  return (
    <Marker coordinate={coordinate}>
      <Image
        source={require('../../assets/black-hole-marker.png')}
        style={styles.blackHoleImage}
        resizeMode="contain"
      />
    </Marker>
  );
};

const styles = StyleSheet.create({
  blackHoleImage: {
    width: 32, // Adjust size as needed
    height: 32, // Adjust size as needed
  },
});

export default BlackHoleMarker;