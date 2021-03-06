function Mouse() {
  var self = this; //extending scope for this
  this.mdown = false;
  this.mdrag = false;
  this.pos = [];
  this.ipos = [];
  this.idistance = 0;

  this.mouseDown = function(e) {
    console.log(e)
    self.pos = self.convertTouches(e)
    self.ipos = self.pos;
    self.mdown = true;
  }

  this.mouseMove = function(e) {
    if (e.touches.length == 2) {self.pinch(e); return}
    else if (e.touches.length != 1) {return}
    if (!self.mdown) {return;} // Not dragging
    self.mdrag = true;
    self.pos = self.convertTouches(e);
    let dx = self.pos[0] - self.ipos[0];
    let dy = self.pos[1] - self.ipos[1];
    game.grid.moveAll(dx,dy)
  }

  this.mouseUp = function() {
    self.mdown = false;
    self.idistance = 0;
    if (self.mdrag) {
      self.mdrag = false;
      game.grid.stop();
    } else {
      self.click();
    }
  }

  this.pinch = function(e) {
    $('.result').text("pinching")
    self.mdrag = true;
    let touches = e.touches;
    let pos1 = [touches[0].screenX,touches[0].screenY];
    let pos2 = [touches[1].screenX,touches[1].screenY];
    var distance = Math.sqrt( ((pos1[0] - pos2[0])**2) + ((pos1[1] - pos2[1])**2) )
    var ddis = 0;
    if (self.idistance != 0) {ddis = (distance - self.idistance) / 15;}
    self.idistance = distance
    game.grid.zoom(game.grid.size + ddis, false)
    $('.result').text(ddis)
  }

  this.click = function() {
    console.log("clicked: " + self.pos[0] + "," + self.pos[1])
    new Square(...self.pos)
  }

  this.convertTouches = function(e) {
    if (e.type.includes("touch")) {
      e.preventDefault()
      let t = e.touches
      let result = [t[0].pageX,t[0].pageY];
      $('.result').text(result[0] + ", " + result[1])
      return result
    } else {
      return [e.pageX,e.pageY];
    }
  }
}
