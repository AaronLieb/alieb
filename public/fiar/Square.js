function Square(x,y) {
  var self = this; //extending scope for this
  this.pos = [x-((x-(game.grid.pos[0]%game.grid.size))%game.grid.size),y-((y-(game.grid.pos[1]%game.grid.size))%game.grid.size)];
  this.rpos = [(this.pos[0]-game.grid.pos[0])/game.grid.size,(this.pos[1]-game.grid.pos[1])/game.grid.size]
  this.ipos = []
  this.size = game.grid.size;
  this.color = game.color;
  this.moving = false;
  this.id = game.grid.squares.length;
  let ele = "<div class=\"square\" id=\"" + this.id + "\"></div>"
  $('body').append(ele)
  this.ele = $('#' + this.id);
  this.ele.css("background-color", this.color)
  game.grid.squares.push(this)

  this.set = function(x,y) {
    self.ele.css("left", (x + game.offset) + "px").css("top", (y + game.offset) + "px")
  }

  this.move = function(dx,dy) {
    if (!self.moving) {
      self.moving = true;
      self.ipos = self.pos.slice(0)
    }
    self.pos[0] = self.ipos[0] + dx;
    self.pos[1] = self.ipos[1] + dy;
    self.set(...self.pos)
  }

  this.changeColor = function() {
    if (game.color == "red") {
      game.color = "blue"
    } else {game.color = "red"}
  }

  this.reset = function() {
    self.set(self.rpos[0] * self.size, self.rpos[1] * self.size)
  }

  this.remove = function() {
    self.ele.remove()
  }

  this.changeSize = function(newSize) {
    self.size = newSize;
    self.pos[0] = self.rpos[0] * newSize + game.grid.pos[0];
    self.pos[1] = self.rpos[1] * newSize + game.grid.pos[1];
    self.set(...self.pos)
    self.ele.css("width", newSize - game.offset - 1).css("max-width", newSize - game.offset - 1)
    self.ele.css("height", newSize - game.offset - 1).css("max-height", newSize - game.offset - 1)
  }

  //post-method construction
  this.set(...this.pos)
  this.changeColor()
  this.changeSize(self.size)
}
