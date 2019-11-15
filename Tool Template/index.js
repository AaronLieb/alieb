$(document).ready(main());

function copyText() {
  console.log("Text Copied");
  $(".output").select()
  document.execCommand("copy");
  $(".output").empty();
  $(".popup").show().delay(300).fadeOut(700);
}

function fillText() {
  $(".output").val("Test")
}

function fillText2() {
  $(".output").val("Test2");
}

function main() {
  $(".select").each(function(){
    $(this).wrap("<span class='select-wrapper'></span>");
    $(this).after("<span class='holder'></span>");
  });
  $(".select").change(function(){
    var selectedOption = $(this).find(":selected").text();
    $(this).next(".holder").text(selectedOption);
  }).trigger('change');
}
