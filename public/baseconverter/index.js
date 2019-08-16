window.onload = function() {
    $("#number").attr("placeholder", ~~(Math.random() * 100))
}

function copyText() {
  console.log("Text Copied");
  $(".output").select()
  document.execCommand("copy");
  $(".output").empty();
  $(".popup").show().delay(300).fadeOut(700);
}

function verifyInput() {
  const b1 = $("#base1").val();
  const b2 = $("#base2").val();
  if ((b1,b2 >= 2 && b1,b2 <= 36) || ((b1.toLowerCase() == "text") && b2 >= 2 && b2 <=36) || ((b2.toLowerCase() == "text") && b1 >= 2 && b1 <=36)) {
    convert(b1,b2);
  } else {
    $(".output").val("Error")
  }
}

function convert(b1,b2) {
  var output = "";
  var input = $("#number").val();
  if (b1.toLowerCase() == "text") {
    for (var i = 0; i < input.length; i++) {
      output += input[i].charCodeAt(0).toString(b2) + " ";
    }
    output = output.substring(0, output.length - 1);
  } else if (b2.toLowerCase() == "text") {
    var binArr = input.split(" ");
    for (i in binArr) {
      output += String.fromCharCode(parseInt(binArr[i], b1))
    }
  }
  else {
    var numC = parseInt(input, b1);
    output = numC.toString(b2)
  }
  $(".output").val(output)
}

function flip() {
  var temp = $("#base1").val();
  $("#base1").val($("#base2").val())
  $("#base2").val(temp);
}
