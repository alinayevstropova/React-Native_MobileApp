/**
 * Utility functions for handling geographical location calculations.
 */
import * as turf from '@turf/turf';

/**
 * Calculates the distance between two geographical coordinates using the Haversine formula.
 * @param {number} lat1 - Latitude of the first point in degrees.
 * @param {number} lon1 - Longitude of the first point in degrees.
 * @param {number} lat2 - Latitude of the second point in degrees.
 * @param {number} lon2 - Longitude of the second point in degrees.
 * @returns {number} The distance between the two points in meters.
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  if (
    [lat1, lon1, lat2, lon2].some(
      (coord) => typeof coord !== "number" || isNaN(coord)
    )
  ) {
    console.error("❌ calculateDistance: One or more coordinates are invalid", {
      lat1, lon1, lat2, lon2,
    });
    return 0;
  }
    const R = 6371e3; // Radius of Earth in meters
    const φ1 = deg2rad(lat1); // Latitude of the first point in radians
    const φ2 = deg2rad(lat2); // Latitude of the second point in radians
    const Δφ = deg2rad(lat2 - lat1); // Difference in latitudes in radians
    const Δλ = deg2rad(lon2 - lon1); // Difference in longitudes in radians
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // Return the distance in meters
  }
  
  /**
   * Converts degrees to radians.
   * @param {number} degrees - The angle in degrees.
   * @returns {number} The angle in radians.
   */
  export function deg2rad(degrees) {
    return degrees * (Math.PI / 180);
  }
  
  /**
   * Checks if a given coordinate is within a certain distance of a target coordinate.
   * @param {number} currentLat - Current latitude in degrees.
   * @param {number} currentLon - Current longitude in degrees.
   * @param {number} targetLat - Target latitude in degrees.
   * @param {number} targetLon - Target longitude in degrees.
   * @param {number} proximityThreshold - Distance threshold in meters.
   * @returns {boolean} True if the coordinate is within the threshold, false otherwise.
   */
  export function isCoordinateWithinProximity(
    currentLat,
    currentLon,
    targetLat,
    targetLon,
    proximityThreshold
  ) {
    const distance = calculateDistance(currentLat, currentLon, targetLat, targetLon);
    return distance <= proximityThreshold; // Check if distance is within the threshold
  }
  
  /**
   * Calculates the bounding box coordinates for a given center coordinate and radius.
   * This can be useful for limiting map queries or determining a region to display.
   * @param {number} centerLat - Center latitude in degrees.
   * @param {number} centerLon - Center longitude in degrees.
   * @param {number} radius - Radius in meters.
   * @returns {{north: number, east: number, south: number, west: number}}
   * An object containing the northern, eastern, southern, and western coordinates of the bounding box in degrees.
   */
  export function getBoundingBox(centerLat, centerLon, radius) {
    const earthRadius = 6371e3; // Earth radius in meters (more precise)
    const angularDistance = radius / earthRadius; // Angular distance in radians
  
    const radCenterLat = deg2rad(centerLat);
    const radAngularDistance = angularDistance;
  
    const northLat = rad2deg(radCenterLat + radAngularDistance);
    const southLat = rad2deg(radCenterLat - radAngularDistance);
  
    const radLonDiff = rad2deg(radAngularDistance / Math.cos(radCenterLat));
    const eastLon = wrapLon(centerLon + radLonDiff);
    const westLon = wrapLon(centerLon - radLonDiff);
  
    return {
      north: northLat,
      east: eastLon,
      south: southLat,
      west: westLon
    };
  }
  
  /**
   * Helper function to wrap longitude values to be within the range [-180, 180] degrees.
   * This prevents coordinate issues when crossing the International Date Line.
   * @param {number} lon - Longitude in degrees.
   * @returns {number} Longitude in the range [-180, 180].
   */
  function wrapLon(lon) {
    const wrappedLon = (lon + 180) % 360 - 180; // Normalize longitude to [-180, 180] range
    return wrappedLon > 180 ? wrappedLon - 360 : wrappedLon;
  }
  
  /**
   * Helper function to convert radians to degrees.
   * @param {number} radians - Angle in radians.
   * @returns {number} Angle in degrees.
   */
  function rad2deg(radians) {
    return radians * (180 / Math.PI);
  }
  /**
 * Checks if the user is on a given road segment.
 * @param {number} userLat - User's latitude in degrees.
 * @param {number} userLon - User's longitude in degrees.
 * @param {{lat: number, lon: number}} roadSegment - Road segment coordinates.
 * @returns {boolean} True if the user is on the road segment, false otherwise.
 */

  export const isUserOnRoad = (userLocation, polylineCoords) => {
    const { latitude, longitude } = userLocation;
  
    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      isNaN(latitude) ||
      isNaN(longitude)
    ) {
      console.warn('⚠️ Invalid user coordinates:', userLocation);
      return false;
    }
  
    const userPoint = turf.point([longitude, latitude]);
  
    const validLine = polylineCoords.filter(
      (coord) =>
        typeof coord.latitude === 'number' &&
        typeof coord.longitude === 'number' &&
        !isNaN(coord.latitude) &&
        !isNaN(coord.longitude)
    );
  
    if (validLine.length < 2) {
      console.warn('⚠️ Not enough valid coordinates for line');
      return false;
    }
  
    const lineString = turf.lineString(
      validLine.map(coord => [coord.longitude, coord.latitude])
    );
  
    const distance = turf.pointToLineDistance(userPoint, lineString, { units: 'meters' });
  
    console.log("📏 Distance to line:", distance);
  
    return distance < 10;
  };
  
  export function isUserNearPoint(userLoc, point, threshold = 10) {
    const distance = calculateDistance(
      userLoc.latitude,
      userLoc.longitude,
      point.latitude,
      point.longitude
    );
    console.log("📏 Distance to line:", distance);
    console.log("📍 User:", userLocation);
    console.log("🛣️ Line:", polylineCoords); // Log the polyline coordinates
    return distance < threshold; // 10 метров по умолчанию
  }
  
  export const reverseCityLookup = async ({ latitude, longitude }) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      return data?.address?.city || data?.address?.town || data?.address?.village;
    } catch (error) {
      console.error("Ошибка при определении города:", error);
      return null;
    }
  };
  