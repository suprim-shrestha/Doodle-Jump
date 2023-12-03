const image = new Image();
let imagePath = "./assets/";
let spriteDirection = "left";
let spriteAction = "";
let imageExtension = ".png";

class Doodler {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vx = 0;
    this.vy = -JUMP_HEIGHT;
  }

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
    this.x += this.vx;

    this.move();
    this.applyGravity();
  }

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
    if (this.vy < 0) {
      spriteAction = "-jump";
    } else {
      spriteAction = "";
    }
    if (this.x + this.width <= 0) {
      this.x = canvas.width;
    } else if (this.x >= canvas.width) {
      this.x = -this.width;
    }
    if (this.y >= canvas.height) {
      gameOver = true;
    }
  }

  applyGravity() {
    this.vy += GRAVITY;
    this.y += this.vy;
  }

  checkPlatformCollision(platform) {
    if (detectPlatformCollision(this, platform) && this.vy > 0) {
      this.vy = -JUMP_HEIGHT;
    }
  }
}
