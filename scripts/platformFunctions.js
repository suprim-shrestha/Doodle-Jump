let platformsSinceLastSpring = 0;
let hasSpring = false;
let platformsSinceLastTrampoline = 0;
let hasTrampoline = false;
let platformOffset = 2;

/**
 * Create a platform above last platform and adds it to platform array
 */
function createPlatform() {
  // Condition for platform to have spring
  if (
    platformsSinceLastSpring > 10 &&
    getRandomNum() < SPRING_PLATFORM_CHANCE
  ) {
    hasSpring = true;
    hasTrampoline = false;
    platformsSinceLastSpring = 0;
  } else if (
    platformsSinceLastTrampoline > 40 &&
    getRandomNum() < TRAMPOLINE_PLATFORM_CHANCE
  ) {
    hasTrampoline = true;
    hasSpring = false;
    platformsSinceLastTrampoline = 0;
  } else {
    platformsSinceLastSpring++;
    platformsSinceLastTrampoline++;
    hasSpring = false;
    hasTrampoline = false;
  }
  const isMoving = getRandomNum() < movingPlatformChance ? true : false;
  const platformX = Math.floor(
    getRandomNum(platformOffset, canvas.width - platformWidth - platformOffset)
  );
  const platformY =
    platformArray[platformArray.length - 1].y -
    getRandomNum(minPlatformDistance, maxPlatformDistance);
  platform = new Platform(
    platformX,
    platformY,
    platformWidth,
    platformHeight,
    isMoving,
    hasSpring,
    hasTrampoline
  );
  platformArray.push(platform);
}

/**
 * Create first 10 platforms
 */
function createInitialPlatforms() {
  let platform = new Platform(
    canvas.width / 2 - platformWidth / 2,
    canvas.height - 50,
    platformWidth,
    platformHeight
  );
  platformArray.push(platform);
  for (let i = 0; i < 9; i++) {
    createPlatform();
  }
}

/**
 * Create new platform when last platform is visible on screen
 */
function createNewPlatforms() {
  if (platformArray[platformArray.length - 1].y >= 0) {
    createPlatform();
  }
}
