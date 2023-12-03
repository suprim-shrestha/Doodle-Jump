const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Get body's width and height and calculate scale
let bodyWidth = window.innerWidth;
let bodyHeight = window.innerHeight;
canvas.width = bodyWidth > MAX_WIDTH ? MAX_WIDTH : bodyWidth;
canvas.height = bodyHeight;
let scale = canvas.width / DEFAULT_WIDTH;
let scoreScale = canvas.height / DEFAULT_HEIGHT;
let gravity = GRAVITY * scale;

// Doodler's default size and position
let doodlerWidth = DEFAULT_DOODLER_WIDTH * scale;
let doodlerHeight = DEFAULT_DOODLER_HEIGHT * scale;
let doodlerX = canvas.width / 2 - doodlerWidth / 2;
let doodlerY = (canvas.height * 7) / 8 - doodlerHeight;
let doodlerJumpHeight = JUMP_HEIGHT * scale;

const doodler = new Doodler(
  doodlerX,
  doodlerY,
  doodlerWidth,
  doodlerHeight,
  doodlerJumpHeight
);

// Platform's default size
let platformArray = [];
let platformWidth = DEFAULT_PLATFORM_WIDTH * scale;
let platformHeight = DEFAULT_PLATFORM_HEIGHT * scale;
let minPlatformDistance = MIN_PLATFORM_DIFFERENCE * scale;
let maxPlatformDistance = MAX_PLATFORM_DIFFERENCE * scale;

let score = 0;
let maxScore = 0;
let gameOver = false;

/**
 * Set all values to default and restarts game
 */
function resetGame() {
  score = 0;
  maxScore = 0;
  gameOver = false;
  doodler.x = doodlerX;
  doodler.y = doodlerY;
  doodler.vy = -doodlerJumpHeight;
  platformArray = [];
  createInitialPlatforms();
}

resetGame();

/**
 * Update score based on the maximum height reached
 */
function updateScore() {
  let points = Math.floor(getRandomNum(0, 10 * scoreScale));
  if (doodler.vy < 0) {
    maxScore += points;
    if (score < maxScore) {
      score = maxScore;
    }
  } else if (doodler.vy >= 0) {
    maxScore -= points;
  }
}

// Set maximum framerate for higher refresh rate screens
let lastRenderTime = 0;
let frameDuration = 1000 / FRAME_RATE;
function animate(currentTime) {
  const timeSinceLastRender = currentTime - lastRenderTime;
  if (timeSinceLastRender >= frameDuration) {
    lastRenderTime = currentTime - (timeSinceLastRender % frameDuration);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Check for gameOver and display game over screen
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
      // Draw all platforms from array
      platformArray.forEach((platform) => {
        platform.draw(ctx);
        doodler.checkPlatformCollision(platform);
      });

      // Draw Doodler
      doodler.draw(ctx);

      // Limit doodler's vertical position and instead move platforms downwards
      if (doodler.vy < 0 && doodler.y <= canvas.height * 0.5) {
        platformArray.forEach((platform) => {
          platform.y -= doodler.vy;
        });
        doodler.y = canvas.height * 0.5;
      }

      // Remove platforms outside the screen and create new ones
      if (platformArray[0].y >= canvas.height) {
        platformArray.shift();
      }
      createNewPlatforms();

      // Update and display score
      updateScore();
      ctx.fillStyle = "black";
      ctx.font = "16px Arial";
      ctx.fillText(score, 5, 20);
    }
  }

  requestAnimationFrame(animate);
}

animate();
