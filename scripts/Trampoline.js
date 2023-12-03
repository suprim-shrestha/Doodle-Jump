// Sprite positions for two trampoline states
const trampolineSpritePosition = {
  default: {
    x: 377,
    y: 191,
    width: 71,
    height: 34,
  },
  extended: {
    x: 299,
    y: 191,
    width: 71,
    height: 34,
  },
};

class Trampoline {
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = trampolineWidth;
    this.height = trampolineHeight;
    this.extended = false;
    this.spritePosition = trampolineSpritePosition.default;
    this.changeToExtended = false;
  }

  /**
   * Draw trampoline sprite on screen
   *
   * @param {*} ctx
   */
  draw(ctx) {
    // Change trampoline sprite, position and size when extended
    if (this.changeToExtended) {
      this.spritePosition = trampolineSpritePosition.extended;
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
