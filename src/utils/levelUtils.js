 // Import i18n for localization

const BASE_DISTANCE = 1000; // 1km base distance for leveling
const DISTANCE_MULTIPLIER = 1.5; // Multiplier for distance increase
const INITIAL_LEVEL_DISTANCE = 1000; // Distance to reach level 1 (in meters)

// Helper function to power
function pow(base, exponent) {
  let result = 1;
  for (let i = 0; i < exponent; i++) {
    result *= base;
  }
  return result;
}

/**
 * Calculates the user's level based on the total distance traveled.
 * @param {number} totalDistance - The total distance traveled by the user in meters.
 * @returns {number} The user's level.
 */
export function calculateLevel(totalDistance) {
  if (totalDistance < INITIAL_LEVEL_DISTANCE) {
    return 1;
  }
  return Math.floor(
    1 + Math.log(totalDistance / INITIAL_LEVEL_DISTANCE) / Math.log(DISTANCE_MULTIPLIER),
  );
}

/**
 * Calculates the distance required to reach the next level.
 * @param {number} currentLevel - The user's current level.
 * @returns {number} The distance required to reach the next level in meters.
 */
export function calculateNextLevelDistance(currentLevel) {
  if (currentLevel < 1) {
    throw new Error('Current level must be at least 1');
  }

  return INITIAL_LEVEL_DISTANCE * pow(DISTANCE_MULTIPLIER, currentLevel - 1);
}

/**
 * Generates a string describing the distance to the next level, localized.
 * @param {number} distanceToNextLevel - Distance to next level.
 * @returns {string} The formatted string, e.g., "1.5 kilometers".
 */
export function formatDistanceToNextLevel(distanceToNextLevel) {
  const km = distanceToNextLevel / 1000;
  return `${km.toFixed(1)} $km === 1 ? 'kilometer' : 'kilometers'`; // Localized
}

/**
 * Gets a percentage between current level distance
 * @param {number} currentDistance
 * @param {number} currentLevel
 * @returns {number} The percent to show
 */
export function getLevelProgress(currentDistance, currentLevel) {
  const currentLevelDistance = calculateNextLevelDistance(currentLevel);
  const nextLevelDistance = calculateNextLevelDistance(currentLevel + 1);

  if (currentLevelDistance === nextLevelDistance) {
    return 100;
  }
  return ((currentDistance - currentLevelDistance) / (nextLevelDistance - currentLevelDistance)) * 100;
}