const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let doodlerWidth = 60;
let doodlerHeight = 62;
let doodlerX = canvas.width / 2 - doodlerWidth / 2;
let doodlerY = (canvas.height * 7) / 8 - doodlerHeight;

const doodler = new Doodler(doodlerX, doodlerY, doodlerWidth, doodlerHeight);

let platformArray = [];
let platformWidth = 57;
let platformHeight = 15;

const platform = new Platform(
  canvas.width / 2 - platformWidth / 2,
  canvas.height - 50,
  platformWidth,
  platformHeight
);

platformArray.push(platform);

let lastRenderTime = 0;

function animate(currentTime) {
  const timeSinceLastRender = currentTime - lastRenderTime;
  if (timeSinceLastRender > 1000 / FRAME_RATE) {
    lastRenderTime = currentTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    doodler.draw(ctx);
    doodler.move();
    doodler.applyGravity();

    platformArray.forEach((platform) => {
      platform.draw(ctx);
      doodler.checkPlatformCollision(platform);
    });
  }

  requestAnimationFrame(animate);
}

animate();
