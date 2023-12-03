const platformImage = new Image();
platformImage.src = "./assets/game-tiles.png";

const platformPositions = {
  staticPlatform: {
    x: 2,
    y: 2,
    width: 114,
    height: 30,
  },
  movingPlatform: {
    x: 2,
    y: 36,
    width: 114,
    height: 30,
  },
};

class Platform {
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  constructor(x, y, width, height, isMoving = false) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isMoving = isMoving;

    if (this.isMoving) {
      this.platformPosition = platformPositions.movingPlatform;
      this.vx = platformSpeed;
    } else {
      this.platformPosition = platformPositions.staticPlatform;
      this.vx = 0;
    }
  }

  /**
   * Draw platform sprite on screen
   *
   * @param {*} ctx
   */
  draw(ctx) {
    ctx.drawImage(
      platformImage,
      this.platformPosition.x,
      this.platformPosition.y,
      this.platformPosition.width,
      this.platformPosition.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    if (this.isMoving) {
      this.move();
    }
  }

  move() {
    if (this.x <= 10 || this.x + this.width >= canvas.width - 10) {
      this.vx *= -1;
    }
    this.x += this.vx;
  }
}
