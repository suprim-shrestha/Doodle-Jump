// Sprite positions for different platform types
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
   * @param {boolean} isMoving
   * @param {boolean} hasSpring
   * @param {boolean} hasTrampoline
   */
  constructor(
    x,
    y,
    width,
    height,
    isMoving = false,
    hasSpring = false,
    hasTrampoline = false
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isMoving = isMoving;
    this.hasSpring = hasSpring;
    this.hasTrampoline = hasTrampoline;

    // Set speed for moving platform
    if (this.isMoving) {
      this.platformPosition = platformPositions.movingPlatform;
      this.vx = platformSpeed;
    } else {
      this.platformPosition = platformPositions.staticPlatform;
      this.vx = 0;
    }

    // Create new Spring object
    if (this.hasSpring) {
      const springX = Math.floor(
        getRandomNum(this.x, this.x + this.width - springWidth)
      );
      const springY = this.y - springHeight;
      this.spring = new Spring(springX, springY);
    }

    // Create new Trampoline object
    if (this.hasTrampoline) {
      const trampolineX = this.x + this.width / 2 - trampolineWidth / 2;
      const trampolineY = this.y - trampolineHeight;
      this.trampoline = new Trampoline(trampolineX, trampolineY);
    }
  }

  /**
   * Draw platform sprite on screen
   *
   * @param {*} ctx
   */
  draw(ctx) {
    ctx.drawImage(
      gameSprites,
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
    if (this.hasSpring) {
      this.spring.draw(ctx);
    }
    if (this.hasTrampoline) {
      this.trampoline.draw(ctx);
    }
  }

  move() {
    if (this.x <= 0 || this.x + this.width >= canvas.width - 0) {
      this.vx *= -1;
    }
    this.x += this.vx;
    if (this.hasSpring) {
      this.spring.x += this.vx;
    }
    if (this.hasTrampoline) {
      this.trampoline.x += this.vx;
    }
  }
}
