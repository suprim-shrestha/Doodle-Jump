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

let score = 0;
let maxScore = 0;
let gameOver = false;

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

function createNewPlatforms() {
  if (platformArray[platformArray.length - 1].y >= 0) {
    createPlatform();
  }
}

function resetGame() {
  score = 0;
  maxScore = 0;
  gameOver = false;
  doodler.x = doodlerX;
  doodler.y = doodlerY;
  doodler.vy = -JUMP_HEIGHT;
  platformArray = [];
  createInitialPlatforms();
}

resetGame();

function updateScore() {
  let points = Math.floor(getRandomNum(0, 10));
  if (doodler.vy < 0) {
    maxScore += points;
    if (score < maxScore) {
      score = maxScore;
    }
  } else if (doodler.vy >= 0) {
    maxScore -= points;
  }
}

let lastRenderTime = 0;
let frameDuration = 1000 / FRAME_RATE;
function animate(currentTime) {
  const timeSinceLastRender = currentTime - lastRenderTime;
  if (timeSinceLastRender >= frameDuration) {
    lastRenderTime = currentTime - (timeSinceLastRender % frameDuration);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameOver) {
      ctx.fillText(
        `Score: ${score}`,
        (canvas.width * 2) / 5,
        (canvas.height * 2) / 5
      );
      ctx.fillText(
        "Game Over: Press 'Space' to Restart",
        canvas.width / 10,
        (canvas.height * 3) / 5
      );
      if (keys.SPACE) {
        resetGame();
      }
    } else {
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
      updateScore();
      ctx.fillStyle = "black";
      ctx.font = "16px Arial";
      ctx.fillText(score, 5, 20);
    }
  }

  requestAnimationFrame(animate);
}

animate();
