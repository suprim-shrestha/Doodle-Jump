const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let doodlerWidth = 46;
let doodlerHeight = 45;
let doodlerX = canvas.width / 2 - doodlerWidth / 2;
let doodlerY = (canvas.height * 7) / 8 - doodlerHeight;

const doodler = new Doodler(doodlerX, doodlerY, doodlerWidth, doodlerHeight);

let platformArray = [];
let platformWidth = 57;
let platformHeight = 15;

function createPlatform() {
  const platformX = Math.floor(getRandomNum(0, canvas.width - platformWidth));
  const platformY =
    platformArray[platformArray.length - 1].y - getRandomNum(30, 90);
  platform = new Platform(platformX, platformY, platformWidth, platformHeight);
  platformArray.push(platform);
}

function createInitialPlatforms() {
  let platform = new Platform(
    canvas.width / 2 - platformWidth / 2,
    canvas.height - 50,
    platformWidth,
    platformHeight
  );
  platformArray.push(platform);
  for (let i = 0; i < 10; i++) {
    createPlatform();
  }
}

createInitialPlatforms();

function createNewPlatforms() {
  if (platformArray[platformArray.length - 1].y >= 0) {
    createPlatform();
  }
}

let lastRenderTime = 0;
let frameDuration = 1000 / FRAME_RATE;
function animate(currentTime) {
  const timeSinceLastRender = currentTime - lastRenderTime;
  if (timeSinceLastRender >= frameDuration) {
    lastRenderTime = currentTime - (timeSinceLastRender % frameDuration);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    platformArray.forEach((platform) => {
      platform.draw(ctx);
      doodler.checkPlatformCollision(platform);
    });

    doodler.draw(ctx);
    if (doodler.vy < 0 && doodler.y <= canvas.height * 0.5) {
      platformArray.forEach((platform) => {
        platform.y -= doodler.vy;
      });
      doodler.y = canvas.height * 0.5;
    }
    if (platformArray[0].y >= canvas.height) {
      platformArray.shift();
    }
    createNewPlatforms();
  }

  requestAnimationFrame(animate);
}

animate();
