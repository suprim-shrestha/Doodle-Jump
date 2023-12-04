const keys = {
  left: false,
  right: false,
  SPACE: false,
};

// Event listeners for key presses
window.onkeydown = (e) => {
  switch (e.code) {
    case "KeyA":
    case "ArrowLeft":
      keys.left = true;
      break;
    case "KeyD":
    case "ArrowRight":
      keys.right = true;
      break;
    case "Space":
      keys.SPACE = true;
      break;
  }
};

window.onkeyup = (e) => {
  switch (e.code) {
    case "KeyA":
    case "ArrowLeft":
      keys.left = false;
      break;
    case "KeyD":
    case "ArrowRight":
      keys.right = false;
      break;
    case "Space":
      keys.SPACE = false;
      break;
  }
};

// Touch event listeners for mobile screens to reset game
window.addEventListener("touchstart", () => {
  keys.SPACE = true;
});

window.addEventListener("touchend", () => {
  keys.SPACE = false;
});

// Tilt event listeners for mobile screens to control the character
window.addEventListener("deviceorientation", handleOrientation);
function handleOrientation(e) {
  let tiltValue = e.gamma;
  let tiltSpeed = tiltValue / 20 >= 1 ? 1 : tiltValue / 20;
  if (tiltValue > 3) {
    speed = SPEED * scale * tiltSpeed;
    keys.right = true;
    keys.left = false;
  } else if (tiltValue < -3) {
    speed = -SPEED * scale * tiltSpeed;
    keys.left = true;
    keys.right = false;
  } else {
    speed = SPEED * scale;
    keys.left = false;
    keys.right = false;
  }
}
