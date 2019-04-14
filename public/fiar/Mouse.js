function Mouse() {
  var self = this; //extending scope for this
  this.mdown = false;
  this.mdrag = false;
  this.pos = [];
  this.ipos = [];

  this.mouseDown = function(e) {
    console.log(e.changedTouches)
    self.pos = self.convertTouches(e)
    self.ipos = self.pos;
    self.mdown = true;
  }

  this.mouseMove = function(e) {
    if (e.changedTouches.length == 2) {self.pinch(e)}
    if (!self.mdown) {return;} // Not dragging
    self.mdrag = true;
    self.pos = self.convertTouches(e);
    let dx = self.pos[0] - self.ipos[0];
    let dy = self.pos[1] - self.ipos[1];
    game.grid.move(dx,dy)
    game.grid.moveSquares(dx,dy)
  }

  this.mouseUp = function() {
    self.mdown = false;
    if (self.mdrag) {
      self.mdrag = false;
      game.grid.stop();
    } else {
      self.click();
    }
  }

  this.pinch = function(e) {
    let touches = e.changedTouches;
    let pos1 = [touches[0].pageX,touches[0].pageY];
    let pos2 = [touches[1].pageX,touches[1].pageY];
    self.idx = Math.sqrt( ((pos1[0] + pos2[0])**2) + ((pos1[1] + pos2[1])**2) )
    $('.result').text(self.idx)
  }

  this.click = function() {
    console.log("clicked: " + self.pos[0] + "," + self.pos[1])
    new Square(...self.pos)
  }

  this.convertTouches = function(e) {
    if (e.type.includes("touch")) {
      e.preventDefault()
      return [e.changedTouches[0].pageX,e.changedTouches[0].pageY];
    } else {
      return [e.pageX,e.pageY];
    }
  }
}
