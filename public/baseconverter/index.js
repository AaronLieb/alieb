window.onload = function() {
    $("#number").attr("placeholder", ~~(Math.random() * 100))
}

function copyText() {
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var el = document.querySelector(".output");
    var editable = el.contentEditable;
    var readOnly = el.readOnly;
    el.contentEditable = true;
    el.readOnly = true;
    var range = document.createRange();
    range.selectNodeContents(el);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);
    el.contentEditable = editable;
    el.readOnly = readOnly;
  } else {
    $(".output").select()
  }
  document.execCommand("copy");
  $(".popup").show().delay(300).fadeOut(700);
}

function verifyInput(...args) {
  for (let val of args) {
    const n = Number(val);
    if (!n || n > 36 || n < 2) {
      if (val.toLowerCase() == "text") {
        continue;
      } else {
        return false;
      }
    }
  }
  return true;
}

function convert() {
  var output = "";
  var input = $("#number").val();
  const b1 = $("#base1").val();
  const b2 = $("#base2").val();
  var outputEle = $(".output");
  if (!(verifyInput(b1,b2))) {
    outputEle.val("Error")
    return;
  }
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
  outputEle.val(output)
}

function flip() {
  var temp = $("#base1").val();
  $("#base1").val($("#base2").val())
  $("#base2").val(temp);
}
