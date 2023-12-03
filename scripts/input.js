const keys = {
  left: false,
  right: false,
  SPACE: false,
};

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

window.onmousedown = () => {
  keys.SPACE = true;
};

window.onmouseup = () => {
  keys.SPACE = false;
};

window.addEventListener("deviceorientation", handleOrientation);

function handleOrientation(e) {
  var tiltValue = e.gamma;
  if (tiltValue > 20) {
    keys.right = true;
    keys.left = false;
  } else if (tiltValue < -20) {
    keys.left = true;
    keys.right = false;
  } else {
    keys.left = false;
    keys.right = false;
  }
}
