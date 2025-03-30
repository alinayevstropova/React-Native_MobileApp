/**
 * Calculates the distance between two geographical coordinates using the Haversine formula.
 * @param {number} lat1 - Latitude of the first point in degrees.
 * @param {number} lon1 - Longitude of the first point in degrees.
 * @param {number} lat2 - Latitude of the second point in degrees.
 * @param {number} lon2 - Longitude of the second point in degrees.
 * @returns {number} The distance between the two points in meters.
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c * 1000; // Distance in meters
    return d;
  }
  
  /**
   * Converts degrees to radians.
   * @param {number} degrees - The angle in degrees.
   * @returns {number} The angle in radians.
   */
  function deg2rad(degrees) {
    return degrees * (Math.PI / 180);
  }
  
  /**
   * Checks if a given coordinate is within a certain distance of a predefined target.
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
    return distance <= proximityThreshold;
  }
  
  /**
   * Calculates the bounding box coordinates for a given center coordinate and radius.
   * @param {number} centerLat - Center latitude in degrees.
   * @param {number} centerLon - Center longitude in degrees.
   * @param {number} radius - Radius in meters.
   * @returns {{north: number, east: number, south: number, west: number}}
   * An object containing the northern, eastern, southern, and western coordinates
   * of the bounding box in degrees.
   */
  export function getBoundingBox(centerLat, centerLon, radius) {
    const earthRadius = 6371000; // Earth's radius in meters
    const radiusInDegrees = (radius / earthRadius) * (180 / Math.PI);
  
    const north = centerLat + radiusInDegrees;
    const south = centerLat - radiusInDegrees;
    const east = centerLon + radiusInDegrees / Math.cos(centerLat * (Math.PI / 180));
    const west = centerLon - radiusInDegrees / Math.cos(centerLat * (Math.PI / 180));
  
    return { north, east, south, west };
  }