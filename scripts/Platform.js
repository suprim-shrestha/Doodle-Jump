const platformImage = new Image();
platformImage.src = "./../assets/game-tiles.png";

class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.color = "#333";
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(
      platformImage,
      1,
      1,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
