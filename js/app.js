$(document).ready(function() {

	// wow = new WOW(
	// 	{
	// 		animateClass: 'animated',
	// 		offset: 100
	// 	}
	// );
	// wow.init();

	// var menuBtn = $('.etoNavIcon');

	// menuBtn.click(function () {
	// 	$(this).toggleClass("-showClose");
	// });

	$("#visaAssistanceLnk, #visaAssistanceSml, #visaAssistanceBG, #aboutLnk").click(function(e) {
		var target = $(this).attr('href');
	    $('html, body').animate({
	        scrollTop: $(target).offset().top - 150
	    }, 2000);
	    e.preventDefault();
	});
});