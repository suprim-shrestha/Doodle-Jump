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
