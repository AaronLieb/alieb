function Game() {
  var self = this
  this.color = "red"
  this.offset = 2
  this.gridSize = 40;
  this.grid = new Grid(this.gridSize)

  this.reset = function() {
    self.grid.reset()
    self.grid.squares.forEach(function(sq) {sq.remove()})
    game = new Game()
  }
}

var mouse = new Mouse()
var game = new Game()

//mouse
window.addEventListener("mousedown", mouse.mouseDown);
window.addEventListener("mousemove", mouse.mouseMove);
window.addEventListener("mouseup", mouse.mouseUp);
//mobile
window.addEventListener("touchstart", mouse.mouseDown, {passive: false} );
window.addEventListener("touchmove", mouse.mouseMove, {passive: false} );
window.addEventListener("touchend", mouse.mouseUp, {passive: false} );
