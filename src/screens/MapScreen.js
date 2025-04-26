import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import MapView, { Circle, Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import haversine from "haversine-distance";
import { useSaveData, useGetData } from "../utils/storageUtils";
import {
  calculateDistance,
  getDistanceFromLatLonInMeters,
} from "../utils/locationUtils";
import BlackHoleMarker from "../components/BlackHoleMarker";
import { useTheme } from "../context/ThemeContext";
import mapStyle from "../styles/mapStyle";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import debounce from "lodash.debounce";

const MapScreen = () => {
  const hasStartedSession = useRef(false);
  const sessionAlreadyEnded = useRef(false);
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(0);
  const [roads, setRoads] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTripMode, setIsTripMode] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const sessionStartRef = useRef(null);
  const [sessionDistance, setSessionDistance] = useState(0);
  const [averageSpeed, setAverageSpeed] = useState(0);
  const prevLocation = useRef(null);
  const roadsLoaded = useRef(false);

  const save = useSaveData();
  const load = useGetData();
  const { theme } = useTheme();
  const isSessionActive = useRef(false);
  const lastSignificantLocationChangeTime = useRef(0);
  const isUserMoving = useRef(false);
  const locationSubscription = useRef(null);
  const hasRequestedPermission = useRef(false);
  const inactivityTimerRef = useRef(null);
  const isMounted = useRef(true);
  const INACTIVITY_TIMEOUT_MS = 300000;
  const INACTIVITY_CHECK_INTERVAL_MS = 60000;
  const SIGNIFICANT_MOVEMENT_THRESHOLD = 2;
  const mapRef = useRef(null);
  const isFocused = useIsFocused();
  const sessionDistanceRef = useRef(0);
  const maxSpeedRef = useRef(0);
  const totalEatenRef = useRef(0);
  const visitedCitiesRef = useRef(new Set());
  const citiesCoverageRef = useRef(new Map());
  const visitedCities90Ref = useRef(new Set());
  const visitedCities100Ref = useRef(new Set());
  const lastCityRef = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (locationSubscription.current) {
        locationSubscription.current.remove();
        locationSubscription.current = null;
      }
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      citiesCoverageRef.current.clear();
    };
  }, []);

  const safeSetState = useCallback((callback) => {
    if (isMounted.current) {
      callback();
    } else {
      console.log("safeSetState prevented due to unmounted component");
    }
  }, []);

  const loadInitialData = useCallback(async () => {
    try {
      const savedDistance = await load("totalDistance");
      console.log("📂 Initial totalDistance loaded:", savedDistance);
      if (savedDistance !== null) {
        safeSetState(() => setTotalDistance(Number(savedDistance)));
      }
    } catch (error) {
      console.error("❌ Error loading saved data:", error);
    }
  }, [load, safeSetState]);

  const endSession = useCallback(
    async (isTimeout = false) => {
      if (
        !isSessionActive.current ||
        sessionAlreadyEnded.current ||
        !hasStartedSession.current
      ) {
        console.log("⛔ Session not really started — skipping endSession");
        return;
      }

      sessionAlreadyEnded.current = true;
      isSessionActive.current = false;

      const finalDistance = sessionDistanceRef.current;
      console.log("🏁 Final sessionDistance:", finalDistance);

      const sessionDuration = sessionStartRef.current
        ? (Date.now() - sessionStartRef.current) / (1000 * 60 * 60)
        : 0; // in hours
      console.log("⏱️ Session duration:", sessionDuration, "hours");

      const sessionSpeed =
        sessionDuration > 0 ? finalDistance / 1000 / sessionDuration : 0;
      console.log("⚡️ Session average speed:", sessionSpeed, "km/h");

      try {
        const prevMaxSpeed = Number(await load("maxSpeed")) || 0;
        const newMaxSpeed = Math.max(prevMaxSpeed, maxSpeedRef.current);
        console.log("🚀 Previous maxSpeed:", prevMaxSpeed, "New maxSpeed:", newMaxSpeed);
        await save("maxSpeed", newMaxSpeed);
        console.log("💾 Saved maxSpeed:", newMaxSpeed);

        const prevCities = (await load("visitedCities")) || [];
        const mergedCities = [
          ...new Set([...prevCities, ...Array.from(visitedCitiesRef.current)]),
        ];
        console.log("🏙️ Merged cities:", mergedCities);
        await save("visitedCities", mergedCities);
        console.log("💾 Saved visitedCities:", mergedCities);

        const prevCities90 = Number(await load("cities90")) || 0;
        const newCities90 = prevCities90 + visitedCities90Ref.current.size;
        console.log("📊 Cities >90%:", newCities90);
        await save("cities90", newCities90);
        console.log("💾 Saved cities90:", newCities90);

        const prevCities100 = Number(await load("cities100")) || 0;
        const newCities100 = prevCities100 + visitedCities100Ref.current.size;
        console.log("💯 Cities 100%:", newCities100);
        await save("cities100", newCities100);
        console.log("💾 Saved cities100:", newCities100);

        const prevEaten = Number(await load("totalEatenPoints")) || 0;
        const updatedEaten = prevEaten + totalEatenRef.current;
        console.log("👾 Total eaten points:", updatedEaten);
        await save("totalEatenPoints", updatedEaten);
        console.log("💾 Saved totalEatenPoints:", updatedEaten);

        const prevTotalDistance = Number(await load("totalDistance")) || 0;
        const prevTotalTime = Number(await load("totalTime")) || 0;

        const updatedTotalDistance = prevTotalDistance + finalDistance;
        const updatedTotalTime = prevTotalTime + sessionDuration;

        console.log("📏 Updated totalDistance:", updatedTotalDistance, "km");
        await save("totalDistance", updatedTotalDistance);
        console.log("💾 Saved totalDistance:", updatedTotalDistance);

        await save("totalTime", updatedTotalTime);

        const totalAvgSpeed =
          updatedTotalTime > 0
            ? updatedTotalDistance / 1000 / updatedTotalTime
            : 0;
        console.log("⚡️ Updated averageSpeed:", totalAvgSpeed, "km/h");
        await save("averageSpeed", totalAvgSpeed);
        console.log("💾 Saved averageSpeed:", totalAvgSpeed);

        console.log("🔥 Итоговая сессия:", {
          distance: updatedTotalDistance,
          avgSpeed: totalAvgSpeed,
          maxSpeed: newMaxSpeed,
          totalEatenPoints: updatedEaten,
          cities90: newCities90,
          cities100: newCities100,
          visitedCities: mergedCities,
        });

        safeSetState(() => setTotalDistance(updatedTotalDistance));
        safeSetState(() => setAverageSpeed(totalAvgSpeed));
      } catch (error) {
        console.error("❌ Ошибка при сохранении статистики:", error);
      } finally {
        sessionStartRef.current = null;
        prevLocation.current = null;
        hasStartedSession.current = false;
        sessionDistanceRef.current = 0; // Reset session distance
        maxSpeedRef.current = 0; // Reset max speed
      }
    },
    [save, load, safeSetState]
  );
  const cleanupSession = useCallback(async () => {
    if (
      !sessionAlreadyEnded.current &&
      hasStartedSession.current &&
      isSessionActive.current
    ) {
      console.log("🧼 cleanupSession -> вызываем endSession()");
      await endSession(); // Сохраняет статистику
      sessionAlreadyEnded.current = true;
    } else {
      console.log("❌ cleanupSession пропущен:", {
        hasStartedSession: hasStartedSession.current,
        isSessionActive: isSessionActive.current,
        sessionAlreadyEnded: sessionAlreadyEnded.current,
      });
    }
  }, []);

  useEffect(() => {
    if (!isFocused) {
      console.log("📴 Screen unfocused");
      cleanupSession();
    }
  }, [isFocused, cleanupSession]);

  useEffect(() => {
    let inactivityIntervalId = null;
    let locationWatch = null;

    const startLocationUpdates = async () => {
      if (hasRequestedPermission.current) return;
      hasRequestedPermission.current = true;

      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Location permission status:", status);
      if (status !== "granted") {
        safeSetState(() =>
          setErrorMsg("Permission to access location was denied")
        );
        safeSetState(() => setLoading(false));
        return;
      }

      if (isSessionActive.current) return;

      console.log("🌱 Starting new location session");

      hasStartedSession.current = true;
      isSessionActive.current = true;
      sessionAlreadyEnded.current = false;
      let initialLoc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      if (initialLoc && initialLoc.coords) {
        safeSetState(() => setLocation(initialLoc.coords));
        prevLocation.current = initialLoc.coords;
        hasStartedSession.current = true;
        console.log("✅ Session started!");
        sessionStartRef.current = Date.now();
        isSessionActive.current = true;
        lastSignificantLocationChangeTime.current = Date.now();
        await fetchRoads(
          initialLoc.coords.latitude,
          initialLoc.coords.longitude
        );
      } else {
        safeSetState(() => setErrorMsg("Failed to get initial location."));
        safeSetState(() => setLoading(false));
        return;
      }

      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      locationWatch = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (newLocation) => {
          console.log("📍 New location update:", newLocation.coords);
          if (newLocation && newLocation.coords) {
            handleLocationChange(newLocation.coords);
          }
        }
      );

      inactivityTimerRef.current = setTimeout(() => {
        endSession(true);
      }, INACTIVITY_TIMEOUT_MS);
    };

    if (!isSessionActive.current) {
      console.log("Starting location updates in useEffect");
      startLocationUpdates();
    }

    loadInitialData();

    inactivityIntervalId = setInterval(() => {
      if (
        isSessionActive.current &&
        !isUserMoving.current &&
        Date.now() - lastSignificantLocationChangeTime.current >
          INACTIVITY_TIMEOUT_MS
      ) {
        endSession(true);
      }
    }, INACTIVITY_CHECK_INTERVAL_MS);

    return () => {
      if (locationWatch) locationWatch.remove();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (inactivityIntervalId) clearInterval(inactivityIntervalId);
      console.log("💀 useEffect cleanup — calling cleanupSession");
      cleanupSession();
    };
  }, [
    loadInitialData,
    endSession,
    safeSetState,
    handleLocationChange,
    interpolatePoints,
    reverseCityLookup,
    debouncedCityLookup,
  ]);
  useEffect(() => {
    global.endMapSession = () => {
      console.log("🌍 Global endMapSession called");
      cleanupSession();
    };
  }, [cleanupSession]);

  const fetchRoads = useCallback(
    async (latitude, longitude) => {
      console.log("📡 fetchRoads called for:", latitude, longitude);

      try {
        safeSetState(() => setLoading(true));
        console.log("📡 Fetching roads for:", latitude, longitude);

        const query = `
          [out:json];
          (
           way(around:200,${latitude},${longitude})["highway"]
           ["highway"!~"^(service|track|path|footway|cycleway)$"];
          );
          out geom;
        `;

        const response = await axios.post(
          "https://overpass-api.de/api/interpreter",
          `data=${encodeURIComponent(query)}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const data = response.data;

        const transformedRoads = data.elements
          .filter((el) => el.type === "way" && Array.isArray(el.geometry))
          .map((way, index) => {
            const coords = way.geometry.map((p) => ({
              latitude: p.lat,
              longitude: p.lon,
            }));

            const interpolatedPoints = interpolatePoints(coords, 10).map(
              (pt) => ({
                latitude: pt.latitude,
                longitude: pt.longitude,
                eaten: false,
              })
            );

            return {
              id: way.id || index,
              points: interpolatedPoints,
            };
          });

        console.log(
          "🍝 Loaded roads:",
          transformedRoads.flatMap((r) => r.points).length,
          "points"
        );

        setRoads(transformedRoads);
        roadsLoaded.current = true;
      } catch (error) {
        console.error("❌ Error loading roads:", error);
        safeSetState(() => setErrorMsg("Error loading roads"));
      } finally {
        safeSetState(() => setLoading(false));
      }
    },
    [safeSetState, interpolatePoints]
  );

  const reverseCityLookup = useCallback(async (coords) => {
    try {
      const result = await Location.reverseGeocodeAsync(coords);
      if (result?.[0]?.city) {
        const city = result[0].city;
        visitedCitiesRef.current.add(city);
        return city;
      }
    } catch (error) {
      console.warn("⚠️ Reverse geocoding failed", error);
    }
    return null;
  }, []);

  const debouncedCityLookup = useRef(
    debounce(async (newCoords) => {
      const cityName = await reverseCityLookup(newCoords);
      if (cityName) {
        if (lastCityRef.current !== cityName) {
          const prevCities = (await load("visitedCities")) || [];
          if (!prevCities.includes(cityName)) {
            await save("visitedCities", [...prevCities, cityName]);
            console.log("💾 Saved new city:", cityName);
          }
          lastCityRef.current = cityName;
        }
      }
    }, 1000)
  ).current;

  const handleLocationChange = useCallback(
    async (newCoords) => {
      if (!roadsLoaded.current) {
        console.log("🚧 Roads not loaded yet, skipping handleLocationChange");
        return;
      }
  
      // Фильтрация слабых GPS данных
      if (newCoords.accuracy > 20) {
        console.log("🛑 Skipping update due to low GPS accuracy:", newCoords.accuracy);
        return;
      }
  
      // Проверка и старт сессии
      if (!hasStartedSession.current) {
        hasStartedSession.current = true;
        sessionStartRef.current = Date.now();
        isSessionActive.current = true;
        console.log("✅ Session started from handleLocationChange");
      }
  
      console.log("📍 New location:", newCoords);
      console.log("📍 Road points count before:", roads.flatMap((r) => r.points).length);
  
      safeSetState(() => {
        setLocation(newCoords);
        if (typeof newCoords.heading === "number" && !isNaN(newCoords.heading)) {
          setHeading(newCoords.heading);
        }
      });
  
      debouncedCityLookup(newCoords);
  
      let newEatenCount = 0;
      let hasRoadsChanged = false;
  
      const updatedRoads = roads.map((road) => {
        const updatedPoints = road.points.map((point) => {
          const distance = calculateDistance(point.latitude, point.longitude, newCoords.latitude, newCoords.longitude);
          if (!point.eaten && distance < 10) {
            newEatenCount++;
            hasRoadsChanged = true;
            return { ...point, eaten: true };
          }
          return point;
        });
  
        if (updatedPoints.some((p, i) => p.eaten !== road.points[i].eaten)) {
          hasRoadsChanged = true;
        }
  
        return { ...road, points: updatedPoints };
      });
  
      if (hasRoadsChanged) {
        setRoads(updatedRoads);
        console.log("📍 Updated roads state");
      } else {
        console.log("📍 Roads data did not change, skipping setRoads");
      }
  
      if (newEatenCount > 0) {
        const prevEaten = Number(await load("totalEatenPoints")) || 0;
        const updatedEaten = prevEaten + newEatenCount;
        totalEatenRef.current = updatedEaten;
        await save("totalEatenPoints", updatedEaten);
        console.log("🟣 Eaten new points:", newEatenCount);
        console.log("💾 Saved totalEatenPoints:", updatedEaten);
      }
  
      // === Фильтр времени обновлений (3 секунды) ===
      const now = Date.now();
      if (lastLocationUpdateRef.current && now - lastLocationUpdateRef.current < 3000) {
        console.log("⏳ Skipping frequent update (<3s)");
        return;
      }
      lastLocationUpdateRef.current = now;
  
      // === Расстояние ===
      if (!prevLocation.current) {
        prevLocation.current = { latitude: newCoords.latitude, longitude: newCoords.longitude };
        console.log("🚫 prevLocation is null, setting for the first time");
        return;
      }
  
      const distance = getDistanceFromLatLonInMeters(
        prevLocation.current.latitude,
        prevLocation.current.longitude,
        newCoords.latitude,
        newCoords.longitude
      );
  
      // Игнорировать микродвижения
      if (isNaN(distance) || distance < 5) {
        console.log("🟡 Distance too small or invalid:", distance);
        return;
      }
  
      console.log("📏 Distance calculated:", distance, "meters");
  
      sessionDistanceRef.current += distance;
      const prevTotal = Number(await load("totalDistance")) || 0;
      const updatedTotal = prevTotal + distance;
      await save("totalDistance", updatedTotal);
      safeSetState(() => setTotalDistance(updatedTotal));
      console.log("📏 Updated totalDistance:", updatedTotal, "meters");
  
      const prevTime = Number(await load("totalTime")) || 0;
      const currentTime = (Date.now() - sessionStartRef.current) / (1000 * 60 * 60); // в часах
      const totalTime = prevTime + currentTime;
  
      const average = totalTime > 0 ? updatedTotal / 1000 / totalTime : 0;
      await save("averageSpeed", average);
      safeSetState(() => setAverageSpeed(average));
      console.log("⚡️ Updated averageSpeed:", average, "km/h");
  
      prevLocation.current = { latitude: newCoords.latitude, longitude: newCoords.longitude };
  
      // Max speed
      const speed = newCoords.speed ? newCoords.speed * 3.6 : 0;
      if (speed > maxSpeedRef.current) {
        maxSpeedRef.current = speed;
        await save("maxSpeed", speed);
        console.log("🚀 New maxSpeed:", speed, "km/h");
      }
  
      // Map camera follow
      if (mapRef.current && isTripMode && location) {
        const mapHeading = typeof newCoords.heading === "number" && !isNaN(newCoords.heading)
          ? newCoords.heading
          : heading;
  
        mapRef.current.animateCamera(
          {
            center: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
            pitch: 60,
            heading: mapHeading,
            zoom: 18,
          },
          { duration: 800 }
        );
      }
    },
    [
      roads,
      safeSetState,
      load,
      save,
      debouncedCityLookup,
      isTripMode,
      heading,
      calculateDistance,
      getDistanceFromLatLonInMeters,
      location,
    ]
  );
  
  

  const interpolatePoints = useCallback((coords, stepInMeters = 10) => {
    const result = [];

    for (let i = 0; i < coords.length - 1; i++) {
      const start = coords[i];
      const end = coords[i + 1];

      if (
        !start ||
        !end ||
        isNaN(start.latitude) ||
        isNaN(start.longitude) ||
        isNaN(end.latitude) ||
        isNaN(end.longitude)
      ) {
        console.warn(
          "⚠️ Skipping coordinate pair due to invalid values:",
          {
            start,
            end,
          }
        );
        continue;
      }

      const distance = haversine(start, end);
      const steps = Math.max(Math.floor(distance / stepInMeters), 1);

      for (let j = 0; j <= steps; j++) {
        const lat =
          start.latitude + (end.latitude - start.latitude) * (j / steps);
        const lon =
          start.longitude + (end.longitude - start.longitude) * (j / steps);
        result.push({
          latitude: lat,
          longitude: lon,
        });
      }
    }

    return result;
  }, []);

  const renderPolylines = useCallback(() => {
    return roads.map((road) => (
      <Polyline
        key={`polyline-${road.id}`}
        coordinates={road.points}
        strokeWidth={5}
        strokeColor="#00FFFF"
      />
    ));
  }, [roads]);

  const renderRoadDots = useCallback(() => {
    console.log("renderRoadDots called");
    console.log("roads length:", roads.length);
    return roads.flatMap((road) =>
      road.points
        .filter((point) => !point.eaten)
        .map((point, idx) => (
          <Circle
            key={`dot-${road.id}-${idx}`}
            center={point}
            radius={2}
            strokeColor="transparent"
            fillColor="rgb(204, 0, 255)"
          />
        ))
    );
  }, [roads]);

  // useEffect to trigger handleLocationChange when roads changes
  useEffect(() => {
    if (roadsLoaded.current && location) {
      handleLocationChange(location);
    }
  }, [roads, location, handleLocationChange]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.neon} />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {console.log("Current location for marker:", location)}
      {location ? (
        <MapView
          ref={mapRef}
          style={{
            flex: 1,
          }}
          showsUserLocation={false}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: location?.latitude || 0,
            longitude: location?.longitude || 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          
        >
          {renderPolylines()}
          {renderRoadDots()}

          {location && (
            <Marker
              key="custom-user-marker"
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              anchor={{
                x: 0.5,
                y: 0.5,
              }}
            >
              <BlackHoleMarker size={30} heading={heading} />
            </Marker>
          )}
        </MapView>
      ) : (
        <Text style={styles.text}>{errorMsg || "Loading map..."}</Text>
      )}
      <TouchableOpacity
        style={styles.centerButton}
        onPress={() => {
          if (mapRef.current && location) {
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
        }}
      >
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tripButton}
        onPress={() => {
          setIsTripMode((prev) => !prev);
        }}
      >
        <Ionicons
          name={isTripMode ? "car-outline" : "car-sport-outline"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
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
  text: {
    textAlign: "center",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
  },
  debugInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  debugText: {
    fontSize: 12,
  },
  centerButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#222",
    borderRadius: 30,
    padding: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  tripButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: "#444",
    borderRadius: 30,
    padding: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default MapScreen;