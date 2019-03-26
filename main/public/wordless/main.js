var players = []
var globalClickable = true;
var bannedWords = []

$(document).ready(function() {
  $("#addPlayer").click(function() {
    var num = $("ul.inputs > li:last > input").attr("placeholder").substring(7)
    var newNum = (+num+1)
    var li = "<li> <input type='text' placeholder='Player " + newNum + "'> </li>"
    $("ul.inputs").append(li)
  });

  $("#removePlayer").click(function() {
    if($("ul.inputs > li").length > 2) {
      $("ul.inputs > li:last").remove()
    }
  });

  $('#start').click(function() {
    $("ul.inputs > li > input").each(function(i) {
      if(this.value != "" && !(players.includes(this.value))) {
        players.push(this.value)
      }
    })
    if(players.length > 1) {
      $("#mainMenu").fadeOut(400).delay(40)
      $("#game").delay(440).fadeIn(400)
      var it = Math.floor(Math.random() * players.length)
      console.log(it)
      for (let i in players) {
        var li = "<li num='0'> <a> " + players[i] + " </a> </li>"
        if (i == it) {
          li = "<li num='1'> <a> " + players[i] + " </a> </li>"
        }
        $("ul.gamePlayers").append(li)
      }
      let randomPrompt = rPrompt(t)
      $("#promptText").text(randomPrompt.prompt);
      $("#word1").text(randomPrompt.badwords[0])
      $("#word2").text(randomPrompt.badwords[1])
      $("#word3").text(randomPrompt.badwords[2])
      $('ul.gamePlayers > li').click(function() {
        if($(this).attr("num") != -1 && globalClickable) {
          if ($(this).attr("num") == 1) {

            $("#popupText").text("You have a disability")
            $(".toggleVis").show()
            move(true)
          } else {
            $("#popupText").html("You have no disabilities")
            $(".toggleVis").hide()
            move(true)
          }
          $("#popup").fadeIn(200)
          $(this).css("background-color", "rgba(0,0,0,0.1)")
          $(this).attr("num", "-1")
        }
      })
    }
  })

  $('#newGame').click(function() {
    if(!globalClickable) {return}
    $("#game").hide()
    $("#mainMenu").show()
    $("ul.gamePlayers > li").each(function(i) {
      $(this).remove()
      players = []
      bannedWords = []
    })
  })
})

function closePopup() {
  $("#popupButton").attr("class","notClickable")
  $("#popup").hide()
  globalClickable = true;
}

function move(show) {
  $("#popupButton.notClickable").unbind()
  globalClickable = false
  var bar = $("#loadingBar")
  if(show) {bar.css("width","1%").show()}
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      bar.delay(200).fadeOut(200)
      $("#popupButton").attr("class","popupClickable")
      $("#popupButton.popupClickable").click(closePopup);
    } else {
      width += 0.15;
      bar.css("width", width + '%')

    }
  }
}

function len(json) {
  return Object.keys(json).length
}

function r(num) {
  return (Math.floor(Math.random() * num))
}

function rPrompt(json) {
  let r1 = r(len(t)-1)
  let common = json["common"]
  let i = json[r1]
  let template = i["template"]
  let words = i["words"]
  let r2 = r(len(words))
  let prompt = "Prompt Loading..."
  let badwords = "test"
  if (i["allTemplate"] == "true") {
    let r3 = r(len(i["banned"]))
    let r4 = r(len(i["banned"]))
    while(r3==r4) {
      r4 = r(len(i["banned"]))
    }
    prompt = template.replace("%s",words[r2])
    badwords = [i["banned"][r3],i["banned"][r4]]
  } else {
    let word = Object.keys(words)[r2];
    let pbadwords = i["banned"].concat(words[word])
    let r3 = r(pbadwords.length)
    let r4 = r(pbadwords.length)
    while(r3==r4) {
      r4 = r(pbadwords.length)
    }
    badwords = [pbadwords[r3],pbadwords[r4]]
    prompt = template.replace("%s",word)
  }
  let r5 = r(len(common))
  badwords.push(common[r5])
  console.log(badwords)
  return {
    prompt: prompt,
    badwords: badwords
  }
}
