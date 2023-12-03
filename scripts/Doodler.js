const image = new Image();
image.src = "../assets/lik-left.png";

class Doodler {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.color = "#49c";

    this.vx = 0;
    this.vy = -JUMP_HEIGHT;
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(image, this.x, this.y, this.width, this.height);
    this.x += this.vx;
  }

  move() {
    if (keys.left || keys.right) {
      this.vx = keys.left ? -SPEED : SPEED;
    } else {
      this.vx = 0;
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
