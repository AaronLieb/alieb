$(document).ready(function() {
  $("li").each(function(i) {
    console.log(i + ": " + $(this).text())
    $(this).delay(i * 150).fadeTo(1000, 1)
  })
  $("li").click(function() {
    document.location.href = $(this).attr("href");
  })

  $("#soon").delay(600).fadeTo(2000, 1)
})
