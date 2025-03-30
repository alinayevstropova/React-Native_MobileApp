import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { AppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { saveRoute, getRoute } from '../utils/storageUtils';
import { calculateDistance } from '../utils/locationUtils';
import BottomMenu from '../components/BottomMenu';
import Icon from 'react-native-vector-icons/FontAwesome';

const MapScreen = () => {
  const { user, settings, setTotalDistance } = useContext(AppContext);
  const { theme } = useTheme();
  const [location, setLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [eatenSegments, setEatenSegments] = useState([]);
  const mapRef = useRef(null);

  const customMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        { "color": "#212121" } // Dark background
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#757575" } // Darker labels
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        { "color": "#212121" } // Darker label stroke
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        { "color": "#757575" } // Darker admin areas
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#9e9e9e" }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        { "visibility": "off" }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#bdbdbd" }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        { "color": "#303030" } // Slightly lighter gray POIs
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#8a8a8a" } // Gray POI labels
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        { "color": "#282828" } // Slightly lighter gray parks
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#6b6b6b" }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        { "color": "#00FFFF" } // Neon blue roads
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        { "color": "#FFFFFF" },
        { "weight": 1.5 } // Slightly thinner stroke
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#9ca5b3" }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        { "color": "#00FFFF" } // Neon blue highways
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#f3d19c" }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        { "visibility": "on" },
        { "color": "#00FFFF" } // Neon blue local roads
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        { "color": "#2f3948" }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#d1b39c" }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        { "color": "#282828" } // Slightly lighter gray water
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#9e9e9e" } // Lighter gray water labels
      ]
    },
    {
      "featureType": "poi.business",
      "elementType": "geometry",
      "stylers": [
        { "visibility": "on" },
        { "color": "#3a3a3a" }
      ]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "geometry",
      "stylers": [
        { "visibility": "on" },
        { "color": "#3a3a3a" }
      ]
    },
  ];

  useEffect(() => {
    const fetchLocationAndRoute = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Denied',
          'Please enable location services to use this feature.',
        );
        return;
      }

      let initialLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(initialLocation.coords);

      if (initialLocation) {
        mapRef.current?.animateToRegion(
          {
            latitude: initialLocation.coords.latitude,
            longitude: initialLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000,
        );
      }

      try {
        const savedRoute = await getRoute(user?.id);
        if (savedRoute) {
          setRouteCoordinates(savedRoute);
          calculateTotalDistance(savedRoute);
        }
      } catch (error) {
        console.error('Error loading saved route:', error);
        Alert.alert(
          'Error Loading Route',
          'Failed to load saved route: ' + error.message,
        );
      }

      const locationWatcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        handleLocationUpdate,
      );

      return () => {
        if (locationWatcher) {
          locationWatcher.remove();
        }
      };
    };

    fetchLocationAndRoute();
  }, [user?.id]);

  const handleLocationUpdate = useCallback(
    async (newLocation) => {
      const { latitude, longitude } = newLocation.coords;
      setLocation(newLocation.coords);

      setRouteCoordinates((prevCoords) => {
        const newRoute = [...prevCoords, { latitude, longitude }];
        try {
          saveRoute(user?.id, newRoute);
        } catch (error) {
          console.error('Error saving route:', error);
          Alert.alert(
            'Error Saving Route',
            'Failed to save route: ' + error.message,
          );
        }
        return newRoute;
      });

      checkAndProcessEatenDistance();
    },
    [user?.id],
  );

  const calculateTotalDistance = useCallback(
    (route) => {
      let totalDistance = 0;
      if (route && route.length > 1) {
        for (let i = 1; i < route.length; i++) {
          const prevCoord = route[i - 1];
          const currCoord = route[i];
          if (prevCoord && currCoord) {
            totalDistance += calculateDistance(
              prevCoord.latitude,
              prevCoord.longitude,
              currCoord.latitude,
              currCoord.longitude,
            );
          }
        }
      }
      setTotalDistance(totalDistance);
    },
    [],
  );

  useEffect(() => {
    calculateTotalDistance(routeCoordinates);
  }, [routeCoordinates, calculateTotalDistance]);

  const checkAndProcessEatenDistance = useCallback(() => {
    if (routeCoordinates.length < 2) return;

    const lastIndex = routeCoordinates.length - 1;
    const prevCoord = routeCoordinates[lastIndex - 1];
    const currCoord = routeCoordinates[lastIndex];
    const segmentDistance = calculateDistance(
      prevCoord.latitude,
      prevCoord.longitude,
      currCoord.latitude,
      currCoord.longitude,
    );

    const EATEN_THRESHOLD = 20;
    if (segmentDistance < EATEN_THRESHOLD) {
      setEatenSegments((prevEaten) => [...prevEaten, lastIndex - 1]);
    }
  }, [routeCoordinates, eatenSegments]);

  const renderRoute = useCallback(() => {
    const neonColor = 'rgba(0, 255, 255, 0.7)';
    const eatenColor = 'gray';

    const segments = [];
    for (let i = 1; i < routeCoordinates.length; i++) {
      segments.push({
        start: routeCoordinates[i - 1],
        end: routeCoordinates[i],
        index: i - 1,
      });
    }

    return segments.map((segment) => {
      const isEaten = eatenSegments.includes(segment.index);
      return (
        <Polyline
          key={`segment-${segment.index}`}
          coordinates={[segment.start, segment.end]}
          strokeColor={isEaten ? eatenColor : neonColor}
          strokeWidth={4}
        />
      );
    });
  }, [routeCoordinates, eatenSegments]);

  const goToMyLocation = useCallback(() => {
    if (location) {
      mapRef.current?.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    } else {
      Alert.alert('Location Unavailable', 'Please ensure location services are enabled.');
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
        }
        showsUserLocation={true}
        mapType="standard"
        userInterfaceStyle={settings.darkMode ? 'dark' : 'light'}
        customMapStyle={customMapStyle}
      >
        {location && (
          <Marker coordinate={location} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={styles.locationMarker} />
          </Marker>
        )}
        {routeCoordinates.length > 1 && renderRoute()}
      </MapView>
      <TouchableOpacity style={styles.myLocationButton} onPress={goToMyLocation}>
        <Icon name="map-marker" size={24} color="white" />
      </TouchableOpacity>
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 255, 255, 0.5)',
    borderWidth: 2,
    borderColor: 'white',
  },
  myLocationButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 20,
  },
});

export default MapScreen;