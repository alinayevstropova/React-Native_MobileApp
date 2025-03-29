import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationContext } from '../context/LocationContext';
import { saveRoute, getRoute } from '../utils/storage';
import LoadingIndicator from './LoadingIndicator';
import { darkTheme } from '../themes';

export default function MapScreen() {
  const { location, fetchLocation } = useContext(LocationContext);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Разрешение на геолокацию отклонено');
        setLoading(false);
        return;
      }

      fetchLocation();
      loadSavedRoute();
    })();
  }, []);

  useEffect(() => {
    if (location) {
      setLoading(false);
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
      console.error("Ошибка загрузки сохраненного маршрута:", error);
    }
  };

    const saveCurrentRoute = async () => {
        try {
            await saveRoute(routeCoordinates);
            Alert.alert("Маршрут сохранен!");
        } catch (error) {
            Alert.alert("Ошибка сохранения маршрута:", error.message)
        }
    }

    if (loading) {
        return (
            <View style={[darkTheme.loadingContainer, styles.loadingContainer]}>
                <LoadingIndicator/>
            </View>
        );
    }

    return (
        <View style={darkTheme.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: location?.latitude || 37.78825,
                    longitude: location?.longitude || -122.4324,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                mapType="mutedStandard"
                onLongPress={saveCurrentRoute}
                >
                {location && (
                    <Marker
                        coordinate={location}
                        pinColor="#00FFFF" // Неоновый цвет маркера
                        />
                )}
                {routeCoordinates.length > 0 && (
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeWidth={4}
                        strokeColor="#00FFFF" // Неоновый цвет маршрута
                        />
                )}
            </MapView>
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
});