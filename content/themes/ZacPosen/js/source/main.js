jQuery( document ).ready( function( $ ) {
	var ROOT, HEADER, PAGE, instagramFeed, mainMenu, mobileMenu, startTimer, stopResetTimer;
					ROOT = $('html, body');
					PAGE = $('body');
					HEADER = $('.main-header');
	$('a.smoothy').click(function() {
		 var href = $.attr(this, 'href');
		 ROOT.stop().animate({
				 scrollTop: $(href).offset().top
		 }, 500, function () {
				 window.location.hash = href;
		 });
		 return false;
	});
	mainMenu = function() {
			var container, dropdown_panel, links, main_header, main_menu_dropdown_timer, slideUpPanel, startTimer, stopResetTimer;
			dropdown_panel = $(".main-menu-dropdown-panel .row");
			main_header = $(".home .main-header");
			container = $('.main-header .menu-container');
			links = container.find('.nav-item').has('.sub-nav').addClass('dropdown').find('> a');
			container.find('.nav-item').has('.sub-nav ul').find('.columns').addClass('col-3');
			HEADER.find(".main-menu .dropdown > a").click(function() {
					var autoHeight, curHeight, dropdown, sub_nav;
					dropdown = $(this).parent();
					sub_nav = dropdown.find(".sub-nav .columns");
					if (Modernizr.touch) {
							if ($('.main-header').hasClass('dropdown-open')) {
									if (dropdown.hasClass("active")) {
											startTimer();
									}
							} else {
									$('.main-header .bg').fadeIn();
							}
					}
					if (dropdown.hasClass("active")) {
							slideUpPanel();
					} else {
							dropdown_panel.find('.columns').remove();
							$('.main-header').addClass('dropdown-open');
							dropdown.addClass("active");
							sub_nav.clone().appendTo(".main-menu-dropdown-panel .row");
							dropdown_panel.slideDown(200, function() {
								return dropdown_panel.css("height", dropdown_panel.outerHeight());
							});
							dropdown_panel.find(".columns").delay(200).animate({
									opacity: 1
							}, 400);
					}
					return false;
			});
			slideUpPanel = function() {
					$('.main-header').removeClass('dropdown-open');
					dropdown_panel.find(".columns").animate({
							opacity: 0
					}, 200);
					return dropdown_panel.delay(200).slideUp(function() {
							HEADER.find(".main-menu .dropdown").removeClass('active');
							dropdown_panel.find('.columns').remove();
							return dropdown_panel.css('height', 'auto');
					});
			};
			main_menu_dropdown_timer = '';
			if (Modernizr.touch === false) {
					$('.main-header').mouseenter(function() {
							return stopResetTimer();
					}).mouseleave(function() {
							if ($('.main-header').hasClass('dropdown-open')) {
									return startTimer();
							}
					});
			}
			startTimer = function() {
					return main_menu_dropdown_timer = setTimeout((function() {
							slideUpPanel();
					}), 800);
			};
			return stopResetTimer = function() {
					return clearTimeout(main_menu_dropdown_timer);
			};
	};
	mainMenu();
	mobileMenu = function() {
			var dropdown_links, mobile_menu, mobile_menu_link;
			mobile_menu_link = $('.mobile-tools .menu');
			mobile_menu = $('.mobile-menu');
			mobile_menu.find('.nav-item').has('.sub-nav').find('> .nav-item-link').addClass('dropdown-link');
			mobile_menu.find('.nav-item').has('.sub-nav').find('> .nav-item-link').append('<span aria-hidden="true" class="glyph plus"></span><span aria-hidden="true" class="glyph minus"></span>');
			dropdown_links = mobile_menu.find("a.dropdown-link");
			mobile_menu_link.click(function() {
					mobile_menu.toggle();
					return false;
			});
			return dropdown_links.click(function() {
					var sub_menu;
					sub_menu = $(this).closest('li').find('.sub-nav:eq(0)');
					sub_menu.slideToggle();
					$(this).find('.glyph.plus').toggle();
					$(this).find('.glyph.minus').toggle();
					return false;
			});
	};
	mobileMenu();
	//FANCYBOX
	$(".fancybox")
			.attr('rel', 'gallery')
			.fancybox({
				padding : 0,
				margin : [70, 60, 70, 60],
				maxWidth: "100%",
				maxHeight: "100%",
				autoResize	: true,
				fitToView	: false,
				nextEffect : 'fade',
				prevEffect : 'fade',
				openEffect : 'elastic',
				closeEffect : 'elastic',
				helpers : {
					title : {
						type : 'over'
					}
				},
				afterShow : function() {
					// stButtons.locateElements();
					$(".fancybox-title").hide();
					$(".fancybox-wrap").hover(function() {
							$(".fancybox-title").stop(true,true).slideDown(200);
						}, function() {
							$(".fancybox-title").stop(true,true).slideUp(200);
					});
				},
				afterLoad: function() {
					this.title = this.title ? this.title + buildShareThis(this.href) : buildShareThis(this.href);
				},
	});
	// Sliders
	$(window).load(function() {
		$('#press-slider').flexslider({
			animation: "slide",
			animationLoop: false,
			slideshow: false,
			itemWidth: 300,
			itemMargin:50,
			keyboard: true,
			move:1,
			slideshowSpeed: 7000,
			animationSpeed: 600,
			directionNav: true,
			controlsContainer: "#press-slider nav",
			controlNav: false,
			minItems: getGridSize(),
			maxItems: getGridSize(),
			start: function(slider){
				flexslider = slider;
				$('#press').removeClass('loading');
			}
		});
	});
	//Resizes
	if ( ($("#press-slider").length) && ($(window).width() > 768) ){
		$(window).on('resize', function() {
			var gridSize = getGridSize();
			flexslider.vars.minItems = gridSize;
			flexslider.vars.maxItems = gridSize;
		});
	}
	function getGridSize() {
				return (window.innerWidth < 320) ? 1 :
							 (window.innerWidth < 400) ? 2 :
							 (window.innerWidth < 992) ? 3 :
							 (window.innerWidth < 1200) ? 4 : 5 ;
	}
	function buildShareThis(url){
		var customShareThis  = "<div class='socials'>";
			customShareThis += "<span class='st_tumblr_large' displayText='Tumblr' st_url='"+url+"'></span>";
			customShareThis += "<span class='st_pinterest_large' displayText='Pinterest' st_url='"+url+"' st_img='"+url+"'></span>";
			customShareThis += "<span class='st_googleplus_large' displayText='Google +' st_url='"+url+"'></span>";
			customShareThis += "<span class='st_instagram_large' displayText='instagram' st_url='"+url+"'></span>";
			customShareThis += "<span class='st_twitter_large' displayText='Tweet' st_url='"+url+"'></span>";
			customShareThis += "<span class='st_facebook_large' displayText='Facebook' st_url='"+url+"'></span>";
			customShareThis += "</div>";
			return customShareThis;
	}
	instagramFeed = function() {
			var client_id, feed_url, getImages, items_to_load, username;
			client_id = home_widget_instagram_client_id;
			if (client_id.length < 1) {
					client_id = 'b9250ffaa750473497707f1f507165dd';
			}
			username = $('.instagram-widget').attr('data-username');
			if (username.length < 1) {
					return;
			}
			feed_url = 'https://api.instagram.com/v1/users/296922654/media/recent/?client_id=' + client_id;
			items_to_load = 6;
			if (!home_widget_twitter_enabled && !home_widget_blog_enabled) {
					items_to_load += 6;
					$('.instagram-widget .items').addClass('wide');
			}
			$.ajax({
					dataType: "jsonp",
					url: 'https://api.instagram.com/v1/users/search?q=' + username + '&client_id=' + client_id,
					success: function(response) {}
			}).done(function(data) {
					var user, user_id, _i, _len, _ref;
					user_id = '';
					_ref = data.data;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
							user = _ref[_i];
							if (username === user.username) {
									user_id = user.id;
									break;
							}
					}
					return getImages(user_id);
			});
			return getImages = function(user_id) {
					return $.ajax({
							dataType: "jsonp",
							url: 'https://api.instagram.com/v1/users/' + user_id + '/media/recent/?client_id=' + client_id,
							success: function(response) {}
					}).done(function(data) {
							var i, img_src, _i, _results;
							_results = [];
							for (i = _i = 0; 0 <= items_to_load ? _i <= items_to_load : _i >= items_to_load; i = 0 <= items_to_load ? ++_i : --_i) {
									img_src = data.data[i].images.low_resolution.url;
									img_src = img_src.replace("http:", "https:");
									_results.push($('.instagram-widget .items').append('<a class="item" target="_blank" href="' + data.data[i].link + '"><img src="' + img_src + '" /></a>'));
							}
							return _results;
					});
			};
	};

});
