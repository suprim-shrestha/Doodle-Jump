/**
 * Create a platform above last platform and adds it to platform array
 */
function createPlatform() {
  const isMoving = getRandomNum() < 0.15 ? true : false;
  const platformX = Math.floor(getRandomNum(0, canvas.width - platformWidth));
  const platformY =
    platformArray[platformArray.length - 1].y -
    getRandomNum(minPlatformDistance, maxPlatformDistance);
  platform = new Platform(
    platformX,
    platformY,
    platformWidth,
    platformHeight,
    isMoving
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
