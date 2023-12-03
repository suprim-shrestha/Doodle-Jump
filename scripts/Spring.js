// Sprite positions for two spring states
const springSpritePosition = {
  default: {
    x: 808,
    y: 198,
    width: 34,
    height: 23,
  },
  extended: {
    x: 808,
    y: 230,
    width: 34,
    height: 55,
  },
};

class Spring {
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = springWidth;
    this.height = springHeight;
    this.extended = false;
    this.spritePosition = springSpritePosition.default;
    this.changeToExtended = false;
  }

  /**
   * Draw spring sprite on screen
   *
   * @param {*} ctx
   */
  draw(ctx) {
    // Change spring sprite, position and size when extended
    if (this.changeToExtended) {
      this.spritePosition = springSpritePosition.extended;
      const newSpringHeight = DEFAULT_SPRING_HEIGHT_EXTENDED * scale;
      const springYOffset = newSpringHeight - this.height;
      this.y -= springYOffset;
      this.height = newSpringHeight;
      this.changeToExtended = false;
    }
    ctx.drawImage(
      gameSprites,
      this.spritePosition.x,
      this.spritePosition.y,
      this.spritePosition.width,
      this.spritePosition.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
