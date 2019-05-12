function main() {
  $('.scrollDown').click(function() {
    scrollTo('.contentContainer')
  })
}

$(document).ready(function() {
  main();
})

function scrollTo(id) {

	$(document).ready(function (){
			$('html, body').animate({
			scrollTop: $(id).offset().top
		}, 1300);
	});
}
