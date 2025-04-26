import React from 'react';
import { Image } from 'react-native';

const BlackHoleMarker = ({ size = 30, heading = 0 }) => (
  <Image
    source={require('../../assets/black-hole-marker.png')}
    accessibilityLabel="Black hole marker"
    style={{
      width: size,
      height: size,
      resizeMode: 'contain',
      transform: [{ rotate: `${heading}deg` }],
    }}
  />
);

export default BlackHoleMarker;
