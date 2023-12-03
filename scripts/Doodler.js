// Initialize sprite for doodler
const image = new Image();
let imagePath = "./assets/";
let spriteDirection = "left";
let spriteAction = "";
let imageExtension = ".png";

class Doodler {
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vx = 0;
    this.vy = -JUMP_HEIGHT;
  }

  /**
   * Draw doodler sprite on screen
   *
   * @param {*} ctx
   */
  draw(ctx) {
    image.src = imagePath + spriteDirection + spriteAction + imageExtension;
    ctx.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      this.x,
      this.y,
      image.width,
      image.height
    );

    this.move();
    this.applyGravity();
  }

  /**
   * Move doodler with key presses
   */
  move() {
    if (keys.left) {
      this.vx = -SPEED;
      spriteDirection = "left";
    } else if (keys.right) {
      this.vx = SPEED;
      spriteDirection = "right";
    } else {
      this.vx = 0;
    }
    this.x += this.vx;

    // Change sprite if doodler is moving up
    if (this.vy < 0) {
      spriteAction = "-jump";
    } else {
      spriteAction = "";
    }

    // Move doodler from one side of screen to another
    if (this.x + this.width <= 0) {
      this.x = canvas.width;
    } else if (this.x >= canvas.width) {
      this.x = -this.width;
    }

    // Set gameOver if doodler falls below canvas height
    if (this.y >= canvas.height) {
      gameOver = true;
    }
  }

  applyGravity() {
    this.vy += GRAVITY;
    this.y += this.vy;
  }

  /**
   * Handle collision between doodler and platform
   *
   * @param {Platform} platform
   */
  checkPlatformCollision(platform) {
    if (detectPlatformCollision(this, platform) && this.vy > 0) {
      this.vy = -JUMP_HEIGHT;
    }
  }
}
