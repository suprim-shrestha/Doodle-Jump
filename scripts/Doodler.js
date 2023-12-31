// Initialize sprite for doodler
const doodlerSprite = new Image();
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
  constructor(x, y, width, height, jumpHeight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.jumpHeight = jumpHeight;
    this.vx = 0;
    this.vy = -this.jumpHeight;
  }

  /**
   * Draw doodler sprite on screen
   *
   * @param {*} ctx
   */
  draw(ctx) {
    doodlerSprite.src =
      imagePath + spriteDirection + spriteAction + imageExtension;
    ctx.drawImage(
      doodlerSprite,
      0,
      0,
      doodlerSprite.width,
      doodlerSprite.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.move();
    this.applyGravity();
  }

  /**
   * Move doodler with key presses
   */
  move() {
    if (keys.left) {
      this.vx = -speed;
      spriteDirection = "left";
    } else if (keys.right) {
      this.vx = speed;
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
    this.vy += gravity;
    this.y += this.vy;
  }

  /**
   * Handle collision between doodler and platform
   *
   * @param {Platform} platform
   */
  checkPlatformCollision(platform) {
    if (detectPlatformCollision(this, platform) && this.vy > 0) {
      this.y = platform.y - this.height;
      this.vy = -this.jumpHeight;
    }
    // Check collision with spring
    if (
      platform.hasSpring &&
      detectPlatformCollision(this, platform.spring) &&
      this.vy > 0
    ) {
      platform.spring.changeToExtended = true;
      this.vy = -JUMP_HEIGHT * 2 * scale;
    } else if (
      platform.hasTrampoline &&
      detectPlatformCollision(this, platform.trampoline) &&
      this.vy > 0
    ) {
      platform.trampoline.changeToExtended = true;
      this.vy = -JUMP_HEIGHT * 3.5 * scale;
    }
  }
}
