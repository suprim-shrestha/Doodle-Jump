const platformImage = new Image();
platformImage.src = "./assets/game-tiles.png";

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

    this.color = "#333";
  }

  /**
   * Draw platform sprite on screen
   *
   * @param {*} ctx
   */
  draw(ctx) {
    ctx.drawImage(
      platformImage,
      1,
      1,
      DEFAULT_PLATFORM_WIDTH,
      DEFAULT_PLATFORM_HEIGHT,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
