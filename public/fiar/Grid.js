function Grid(size) {
  var self = this; //extending scope for this
  this.size = size;
  this.pos = [0,0];
  this.ipos = [0,0]
  this.moving = false;
  this.squares = [];

  this.set = function(x,y) {
    $('html').css("background-position", x + "px " + y + "px")
  }

  this.move = function(dx,dy) {
    if (!self.moving) {
      self.moving = true;
      self.ipos = self.pos.splice(0)
    }
    self.pos[0] = self.ipos[0] + dx;
    self.pos[1] = self.ipos[1] + dy;
    self.set(...self.pos)
  }

  this.moveSquares = function(dx,dy) {
    self.squares.forEach(function(sq) {sq.move(dx,dy)})
  }

  this.stop = function() {
    self.moving = false;
    self.squares.forEach(function(sq) {sq.moving = false;})
  }
  this.reset = function() {
    self.pos = [0,0]
    self.set(...self.pos)
    self.squares.forEach(function(sq) {sq.reset()})
  }
  this.zoom = function(newSize) {
    self.size = newSize
    $('html').css("background-size", newSize + "px " + newSize + "px")
    self.squares.forEach(function(sq) {sq.changeSize(newSize)})
  }
}
