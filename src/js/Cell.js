function Cell(width, height, x, y) {
  this.w = width;
  this.h = height;
  this.x = x;
  this.y = y;
  this.borders = {
    top: true,
    right: true,
    bottom: true,
    left: true
  };
  this.isVisited = false;
  this.isFixed = false;
}
