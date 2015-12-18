function resize(){
	var windowHeight = $(window).height();
			$('.home .top_bar').css({ top: windowHeight });
			$("#home-feature").css({ height: windowHeight });
			$('#featured-collection').css({ marginTop: windowHeight + 90 });
}

$(document).ready(function() {
	var $window    = $(window),
			topBar = $('.home .top_bar'),
			colorChanging = $('.colored'),
			$sidebar   = $(".side"),
			offset     = $sidebar.offset(),
			topPadding = 115;

	$window.scroll(function(){
			var scrolled = Math.max(0, $(window).scrollTop()),
					windowHeight = $(window).height();
				if(scrolled >= windowHeight) {
					topBar.addClass('fixed');
				} else {
					topBar.removeClass('fixed');
				}
	});

	$window.load(function() {
		var diffH = $("#feature_image").height() - $sidebar.height();

				$('.loader').fadeOut(150);

				$window.scroll(function(){
					var scrolled = Math.max(0, $(window).scrollTop());
						//Follow sidebar
						if( ($sidebar.length) && ( $(window).width() > 550 ) && ( $(window).height() > $sidebar.height() ) ){
							if (scrolled >= offset.top) {
								if ( scrolled >= diffH ){
									$sidebar.stop().animate({
										marginTop: diffH
									});
								} else {
									$sidebar.stop().animate({
										marginTop: scrolled - offset.top + topPadding
									});
								}
							} else {
								$sidebar.stop().animate({
									marginTop: 0
								});
							}
						}
				});

				$('#home-feature .flexslider').flexslider({
						controlNav: false,
						directionNav: false,
						animation: "fade",
						slideshow: true,
						slideshowSpeed: 3000,
						animationSpeed: 500,
						useCSS:true,
						smoothHeight:true,
						start: function(){
							var logoColor = $('li.flex-active-slide #caption').attr('class');
							$('.flex-active-slide .link').clone().prependTo('.links');
							colorChanging.toggleClass(logoColor);
						},
						before: function(slider){
							var dir = slider.direction,
									nextObj;
							if (dir === "next") {
								nextObj = (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
							} else {
								nextObj = (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
							}
							var nextSlide = slider.slides.eq(nextObj);
							var logoColor = $(nextSlide).find("#caption").attr('class');
							colorChanging.removeClass("dark white accent");
							colorChanging.addClass(logoColor);
						},
						after: function(){
							$('.links p:last').remove();
							$('.flex-active-slide .link').clone().prependTo('.links');
						},
				});
				$('.page .flexslider').flexslider({
							animation: "slide"
				});
	});
	$window.on('resize', resize);
	resize();
	//Smooth scroll
	$('a.smoothy').click(function() {
		 var href = $.attr(this, 'href');
		 $('html, body').stop().animate({
				 scrollTop: $(href).offset().top - 90
		 }, 500, function () {
				 window.location.hash = href;
		 });
		 return false;
	});
	//Toggle Search input
	$( ".icon-search").click(function() {
		if ($(this).parent().hasClass('home') ) {
			var href = $(this).data('href');
			$('html, body').stop().animate({
					scrollTop: $(href).offset().top - 90
			}, 500, function () {
					window.location.hash = href;
			});
		 $( "#nav form" ).delay(500).slideToggle();
		} else {
			$( "#nav form" ).slideToggle();
		}
	});
	//Toggle inquiries form
	$( "#displayText").click(function() {
		$(this).addClass('open');
		$( "#toggleText" ).slideToggle();
	});
	$(".press p a").fancybox();
});
