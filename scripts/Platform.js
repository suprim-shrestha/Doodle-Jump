const platformImage = new Image();
platformImage.src = "./assets/game-tiles.png";

const platformPositions = {
  staticPlatform: {
    x: 2,
    y: 2,
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
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.platformPosition = platformPositions.staticPlatform;
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
  }
}
