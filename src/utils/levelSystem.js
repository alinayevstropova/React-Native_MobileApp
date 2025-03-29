export function calculateLevel(distance) {
  if (distance < 100) return 1;
  if (distance < 500) return 2;
  if (distance < 1000) return 3;
  if (distance < 2000) return 4;
  if (distance < 5000) return 5;
  return Math.floor(6 + Math.log10(distance / 5000) * 2);
}

export function calculateExperience(distance) {
  return Math.floor(distance * 1.5);
}

// Function to calculate the experience required for the next level
export function calculateNextLevelExperience(level) {
    if (level <= 5) {
        return [0, 100, 500, 1000, 2000, 5000][level];
    }
    return Math.floor(5000 * Math.pow(10, (level - 5) / 2));
}

// Function to get the progress towards the next level as a percentage
export function getLevelProgress(distance, currentLevel) {
    const currentLevelExperience = calculateExperience(distance);
    const nextLevelExperience = calculateNextLevelExperience(currentLevel + 1);
    const prevLevelExperience = calculateNextLevelExperience(currentLevel);

    if (nextLevelExperience === prevLevelExperience) {
        return 100; // Avoid division by zero
    }

    return ((currentLevelExperience - prevLevelExperience) / (nextLevelExperience - prevLevelExperience)) * 100;
}