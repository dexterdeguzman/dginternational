$(document).ready(function() {

	// wow = new WOW(
	// 	{
	// 		animateClass: 'animated',
	// 		offset: 100
	// 	}
	// );
	// wow.init();

	var menuBtn = $('#menuBurger');

	menuBtn.click(function () {
		$(this).toggleClass("-collapsed");

		var box = $('#topNavList');
		if (box.is(':visible')) {
	      box.slideUp(300, function () {
	        box.removeClass('-show');
	      });
	    } else {
	      box.slideDown(300, function () {
	        box.addClass('-show');
	      });
	    }
		// $('#topNavList').toggleClass("-show");
	});

	$("#visaAssistanceLnk, #visaAssistanceSml, #visaAssistanceBG, #aboutLnk").click(function(e) {
		var target = $(this).attr('href');
	    $('html, body').animate({
	        scrollTop: $(target).offset().top - 150
	    }, 800);
	    e.preventDefault();
	});

	document.getElementById('footerYear').textContent = new Date().getFullYear();
});