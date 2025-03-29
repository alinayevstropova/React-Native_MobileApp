import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationContext } from '../context/LocationContext';
import { saveRoute, getRoute } from '../utils/storage';
import LoadingIndicator from '../components/LoadingIndicator';
import { darkTheme } from '../themes';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MapScreen() {
  const { location, fetchLocation } = useContext(LocationContext);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapType, setMapType] = useState(Platform.OS === 'ios' ? 'mutedStandard' : 'standard');
  const [showRoute, setShowRoute] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Разрешение на геолокацию отклонено', 'Пожалуйста, включите геолокацию в настройках.');
        setLoading(false);
        return;
      }
      setLoading(true);
      fetchLocation();
      loadSavedRoute();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      setRouteCoordinates((prevCoords) => [...prevCoords, location]);
    }
  }, [location]);

  const loadSavedRoute = async () => {
    try {
      const savedRoute = await getRoute();
      if (savedRoute) {
        setRouteCoordinates(savedRoute);
      }
    } catch (error) {
      console.error('Ошибка загрузки сохраненного маршрута:', error);
    }
  };

  const saveCurrentRoute = async () => {
    try {
      await saveRoute(routeCoordinates);
      Alert.alert('Маршрут сохранен!');
    } catch (error) {
      Alert.alert('Ошибка сохранения маршрута:', error.message);
    }
  };

  const toggleMapType = () => {
    setMapType((prevType) => {
      if (Platform.OS === 'ios') {
        return prevType === 'mutedStandard' ? 'standard' : 'mutedStandard';
      } else {
        return prevType === 'standard' ? 'satellite' : 'standard';
      }
    });
  };

  const toggleRouteVisibility = () => {
    setShowRoute(!showRoute);
  };

  const zoomToCurrentLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  };

  if (loading) {
    return (
      <View style={[darkTheme.loadingContainer, styles.loadingContainer]}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <View style={darkTheme.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location?.latitude || 37.78825,
          longitude: location?.longitude || -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType={mapType}
        onLongPress={saveCurrentRoute}
        showsUserLocation={true}
      >
        {location && (
          <Marker coordinate={location} pinColor="#00FFFF" />
        )}
        {showRoute && routeCoordinates.length > 0 && (
          <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="#00FFFF" />
        )}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.mapStyleButton} onPress={toggleMapType}>
          <Icon name="map" size={24} color="#00FFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.locationButton} onPress={zoomToCurrentLocation}>
          <Icon name="crosshairs" size={24} color="#00FFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.routeButton} onPress={toggleRouteVisibility}>
          <Icon name={showRoute ? 'eye-slash' : 'eye'} size={24} color="#00FFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveRouteButton} onPress={saveCurrentRoute}>
          <Icon name="save" size={24} color="#00FFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapStyleButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  locationButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  routeButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  saveRouteButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
});