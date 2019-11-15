window.onload = function() {
    main();
}

function main() {
  var game = new Game();
  console.log(game.player.name);
}


class Player {
  constructor(name) {
    this.name = name;
  }
}

class Game {
  constructor() {
    this.state = 0; //Start Editing Running Ending
    this.player = new Player("test");
  }
}
