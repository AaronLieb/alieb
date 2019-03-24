const constBoard = [
            /* Board 1 */
              [[0,0,0,0],
               [0,0,0,0],
               [0,0,0,0],
               [0,0,0,0]],
            /* Board 2 */
              [[0,0,0,0],
               [0,0,0,0],
               [0,0,0,0],
               [0,0,0,0]],
            /* Board 3 */
              [[0,0,0,0],
               [0,0,0,0],
               [0,0,0,0],
               [0,0,0,0]],
            /* Board 4 */
              [[0,0,0,0],
               [0,0,0,0],
               [0,0,0,0],
               [0,0,0,0]]
            ]

var board = constBoard;

var won = false;

var easy = false;
var easyModeNum = 0;

var lastMove;
var lastMoveString;

var winningPieces = [];

var humanTurn = true;

var turn = 1
var turnString = "<a style=\"color:#f33535;\">X</a>"

function s(val) {
  if (val==1) {return 2;}
  else {return 1;}
}

function switchTurn() {
  if(turn===1) {
    turn=2;
    turnString="<a style=\"color:#1f6dff;\">O</a>"
    $("#turnLabel").text("O")
    $("#turnLabel").css("background-color","#18b0f2")
  } else {
    turn=1;
    turnString="<a style=\"color:#f33535;\">X</a>"
    $("#turnLabel").text("X")
    $("#turnLabel").css("background-color","#f33535")
  }
}

function wrong() {
  $('.grid-item')
  .css("border-color", "red")
  .delay(200)
  .queue(function (next) {
    $(this).css("border-color", "black");
    next();
  });
}

function maybeReset() {
  if(won) {reset();return;}
  $("#reset").css("background-color","red")
  $("#reset").text("Are you sure?")
  $("#reset").attr("onclick","reset()");
  $("#undo").text("No")
  $("#undo").attr("onclick","nevermind()");
  $("#undo").css("background-color","limeGreen");
}

function nevermind() {
  $("#reset").css("background-color","black")
  $("#reset").text("Reset")
  $("#reset").attr("onclick","maybeReset()");
  $("#undo").text("Undo")
  $("#undo").attr("onclick","undo()");
  $("#undo").css("background-color","black");
}

function undo() {
  if (lastMoveString==undefined) {return;}
  if (won) {return;}
  board[lastMove[0]][lastMove[1]][lastMove[2]] = 0;
  let id = "#" + lastMoveString
  lastMoveString = undefined;
  $(id).text("");
  switchTurn()
}

function reset() {
  won = false;
  lastMoveString = undefined;
  $(".title").text("3D Tic Tac Toe")
  for (let i=0;i<board.length;i++) {
    for (let o=0;o<board[i].length;o++) {
      for (let u=0;u<board[i][o].length;u++) {
        board[i][o][u] = 0
      }
    }
  }
  $(".grid-item").text("");
  nevermind()
  turn=1;
  turnString="<a style=\"color:#f33535;\">X</a>"
  $("#turnLabel").text("X")
  $("#turnLabel").css("background-color","#f33535")
  $(".grid-item").css("background-color","white");
  $(".grid-item").css("border-radius","0");
  $(".left").css("border-left-style","solid");
  $(".right").css("border-right-style","solid");
  $(".top").css("border-top-style","solid");
  $(".bottom").css("border-bottom-style","solid");
}

function checkWin(b,y,x) {
  resetEasyMode()
  let w = [];
  for (let b2 = 0;b2<4;b2++) { // Same tile, different boards
    if (board[b2][y][x] == turn) {
      w.push("" + (1+b2)+(1+x)+(1+y));
    } else if (board[b2][y][x] == s(turn)) {
      w = []
    }
    if (w.length>=3) {gameCondition(w);}
  }

  w = [];
  for (let y2 = 0;y2<4;y2++) { // Same board, horizontal column
    if (board[b][y2][x] == turn) {
      w.push("" + (1+b)+(1+x)+(1+y2));
    }
    else if (board[b][y2][x] == s(turn)) {
      w = []
    }
    if (w.length>=3) {gameCondition(w);}
  }

  w = [];
  for (let x2 = 0;x2<4;x2++) { // Same board, verticle column
    if (board[b][y][x2] == turn) {
      w.push("" + (1+b)+(1+x2)+(1+y));
    }
    else if (board[b][y][x2] == s(turn)) {
      w = []
    }
    if (w.length>=3) {gameCondition(w);}
  }

  w = [];
  for (let xy = 0;xy<4;xy++) { // Same board, diagonal line
    if (board[b][xy][xy] == turn) {
      w.push("" + (1+b)+(1+xy)+(1+xy));
    } else if (board[b][xy][xy] == s(turn)) {
      w = []
    }
    if (w.length>=3) {gameCondition(w);}
  }

  w = [];
  for (let xy = 0;xy<4;xy++) { // (--) Same board, diagonal line (--)
    let nxy = 3-xy;
    if (board[b][nxy][xy] == turn) {
      w.push("" + (1+b)+(1+xy)+(1+nxy));
    } else if (board[b][nxy][xy] == s(turn)) {
      w = []
    }
    if (w.length>=3) {gameCondition(w);}
  }

  w = [];
  for (let bxy = 0;bxy<4;bxy++) { //  (++) Different boards, diagonal line (++)
    if (board[bxy][bxy][bxy] == turn) {
      w.push("" + (1+bxy)+(1+bxy)+(1+bxy));
    } else if (board[bxy][bxy][bxy] == s(turn)) {
      w = []
    }
    if (w.length>=3) {gameCondition(w);}
  }

  w = [];
  for (let by = 0;by<4;by++) { // (++) Different boards, verticle columns (++)
    if (board[by][by][x] == turn) {
      w.push("" + (1+by)+(1+x)+(1+by));
    } else if (board[by][by][x] == s(turn)) {
      w = []
    }
    if (w.length>=3) {gameCondition(w);}
  }

  w = [];
  for (let bx = 0;bx<4;bx++) { // (++) Different boards, horizontal rows (++)
    if (board[bx][y][bx] == turn) {
      w.push("" + (1+bx)+(1+bx)+(1+y));
    } else if (board[bx][y][bx] == s(turn)) {
      w = []
    }
    if (w.length>=3) {gameCondition(w);}
  }

  w = [];
  for (let bxy = 0;bxy<4;bxy++) { //  (--) Different boards, diagonal line (--)
    let nbxy = 3-bxy;
    if (board[nbxy][bxy][nbxy] == turn) {
      w.push("" + (1+nbxy)+(1+nbxy)+ (1+bxy));
    } else if (board[nbxy][bxy][nbxy] == s(turn)) {
      w = []
    }
    if (w.length>=3) {gameCondition(w);}
  }

  w = [];
  for (let bxy = 0;bxy<4;bxy++) { //  (--) Different boards, diagonal line (--)
    let nbxy = 3-bxy;
    if (board[bxy][nbxy][nbxy] == turn) {
      w.push("" + (1+bxy)+(1+nbxy)+ (1+nbxy));
    } else if (board[bxy][nbxy][nbxy] == s(turn)) {
      w = []
    }
    if (w.length>=3) {gameCondition(w);}
  }

  w = [];
  for (let bxy = 0;bxy<4;bxy++) { //  (--) Different boards, diagonal line (--)
    let nbxy = 3-bxy;
    if (board[nbxy][nbxy][bxy] == turn) {
      w.push("" + (1+nbxy)+(1+bxy)+ (1+nbxy));
    } else if (board[nbxy][nbxy][bxy] == s(turn)) {
      w = []
    }
    if (w.length>=3) {gameCondition(w);}
  }

  w = [];
  for (let bxy = 0;bxy<4;bxy++) { //  (--) Different boards, diagonal line (--)
    let nbxy = 3-bxy;
    if (board[bxy][nbxy][bxy] == turn) {
      w.push("" + (1+bxy)+(1+bxy)+ (1+nbxy));
    } else if (board[bxy][nbxy][bxy] == s(turn)) {
      w = []
    }
    if (w.length>=3) {gameCondition(w);}
  }


  w = [];
  for (let by = 0;by<4;by++) { // (--) Different boards, verticle colum (--)
    let nby = 3-by;
    if (board[by][nby][x] == turn) {
      w.push("" + (1+by)+(1+x)+(1+nby));
    } else if (board[by][nby][x] == s(turn)) {
      w = []
    }
    if (w.length>=3) {gameCondition(w);}
  }

  w = [];
  for (let bx = 0;bx<4;bx++) { // (--) Different boards, horizonal row (--)
    let nbx = 3-bx;
    if (board[bx][y][nbx] == turn) {
      w.push("" + (1+bx)+(1+nbx)+(1+y));
    } else if (board[bx][y][nbx] == s(turn)) {
      w = []
    }
    if (w.length>=3) {gameCondition(w);}
  }

}

function gameCondition(winningPieces) {
  if (winningPieces.length>3) {
    won = true;
    if(turn==1) {
      $(".title").text("X WINS");
    } if (turn==2) {
      $(".title").text("O WINS");
    }
    for (let p = 0;p<winningPieces.length;p++) {
      piece = ("#" + winningPieces[p]);
      if(turn==1) {
        $(piece).css("background-color","#f33535");
        $(piece).html("<a style=\"color:white;\">X</a>");
      }
      else {
        $(piece).css("background-color","#1f6dff");
        $(piece).html("<a style=\"color:white;\">O</a>");
      }
      $(piece).css("border-style","none");
      $(piece).css("border-radius","4px");
    }
  } else if (winningPieces.length==3) {
    easyMode(winningPieces)
    c()
  }
}

function easyMode(pieces) {
  if (!easy) {return}
  for (let p = 0;p<pieces.length;p++) {
    piece = ("#" + pieces[p]);
    if(turn==1) {
      $(piece).css("background-color","#FDECEC");
    }
    else {
      $(piece).css("background-color","#D2E1FF");
    }
  }
}

function resetEasyMode() {
    $(".grid-item").css("background-color","white");
}


function c() {
  //$("#s").text(".")
  console.log("3 in a row")
}

function changeMode() {
  easyModeNum += 1
}

function check() {
  if (easyModeNum = 5) {
    easy = true;
    console.log("Easy Mode Enabled")
    $("#turnLabel").text("Easy: ON")
  }
}



$(document).ready(function() {
  $(".grid-item").click(function () {
    if(!humanTurn) {return;}
    let pos = this.id
    b = pos[0] - 1
    x = pos[1] - 1
    y = pos[2] - 1
    if (board[b][y][x] === 0) {
      board[b][y][x] = turn
      if (!won) {
        $(this).html(turnString);
        oldBoard = board;
        lastMoveString = this.id
        lastMove = [b,y,x]
        checkWin(b,y,x)
        switchTurn()
      }
    } else {
      wrong();
    }
  });
});
