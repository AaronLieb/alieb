function copyText() {
  console.log("Text Copied");
  $(".output").select()
  document.execCommand("copy");
  $(".output").empty();
  $(".popup").show().delay(300).fadeOut(700);
}

function convert() {
  var output = "";
  var input = $("#number").val();
  const b1 = $("#base1").val();
  const b2 = $("#base2").val();
  if (b1=="text") {
    for (var i = 0; i < input.length; i++) {
      output += input[i].charCodeAt(0).toString(b2) + " ";
    }
    output = output.substring(0, output.length - 1);
  } else if (b2=="text") {
    var binArr = input.split(" ");
    for (i in binArr) {
      output += String.fromCharCode(parseInt(binArr[i], b1))
    }
    //var binArr = parseInt(num, b1).toString(2);
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
