/*
 * Reveal.js menu plugin
 * MIT licensed
 * (c) Greg Denehy 2015
 */

var RevealMenu = window.RevealMenu || (function(){
	var config = Reveal.getConfig();
	var options = config.menu || {};
	options.path = options.path || scriptPath() || 'plugin/menu';

	var module = {};

	loadResource(options.path + '/lib/jeesh.min.js', 'script', function() {
	loadResource(options.path + '/lib/bowser.min.js', 'script', function() {
	loadResource(options.path + '/menu.css', 'stylesheet', function() {
	loadResource(options.path + '/font-awesome-4.3.0/css/font-awesome.min.css', 'stylesheet', function() {
		// does not support IE8 or below
		if (!bowser.msie || bowser.version >= 9) {
			//
			// Set option defaults
			//
			var side = options.side || 'left';	// 'left' or 'right'
			var numbers = options.numbers || false;
			var markers = options.markers || false;
			var themes = options.themes;
			if (typeof themes === "undefined") {
				themes = [
					{ name: 'Black', theme: 'css/theme/black.css' },
					{ name: 'White', theme: 'css/theme/white.css' },
					{ name: 'League', theme: 'css/theme/league.css' },
					{ name: 'Sky', theme: 'css/theme/sky.css' },
					{ name: 'Beige', theme: 'css/theme/beige.css' },
					{ name: 'Simple', theme: 'css/theme/simple.css' },
					{ name: 'Serif', theme: 'css/theme/serif.css' },
					{ name: 'Blood', theme: 'css/theme/blood.css' },
					{ name: 'Night', theme: 'css/theme/night.css' },
					{ name: 'Moon', theme: 'css/theme/moon.css' },
					{ name: 'Solarized', theme: 'css/theme/solarized.css' }
				];
			}
			var transitions = options.transitions;
			if (typeof transitions === "undefined") transitions = true;
			if (bowser.msie && bowser.version <= 9) {
				// transitions aren't support in IE9 anyway, so no point in showing them
				transitions = false;
			}
			var openButton = options.openButton;
			if (typeof openButton === "undefined") openButton = true;
			var openSlideNumber = options.openSlideNumber;
			if (typeof openSlideNumber === "undefined") openSlideNumber = false;


			//
			// Utilty functions
			//

			function openMenu(event) {
				if (event) event.preventDefault();
			    $('body').addClass('slide-menu-active');
			    $('.reveal').addClass('has-' + options.effect + '-' + side);
			    $('.slide-menu').addClass('active');
			    $('.slide-menu-overlay').addClass('active');

			    // set highlight for selected theme
			    $('div[data-panel="Themes"] li').removeClass('active');
			    $('li[data-theme="' + $('#theme').attr('href') + '"]').addClass('active');

			    // set hightlight for selected transition
			    $('div[data-panel="Transitions"] li').removeClass('active');
			    $('li[data-transition="' + Reveal.getConfig().transition + '"]').addClass('active');
			}

			function closeMenu(event) {
				if (event) event.preventDefault();
			    $('body').removeClass('slide-menu-active');
			    $('.reveal').removeClass('has-' + options.effect + '-' + side);
			    $('.slide-menu').removeClass('active');
			    $('.slide-menu-overlay').removeClass('active');
			}

			function toggleMenu(event) {
				if (isOpen()) {
					closeMenu(event);
				} else {
					openMenu(event);
				}
			}

			function isOpen() {
				return $('body').hasClass('slide-menu-active');
			}

			function openPanel(event) {
				openMenu(event);
				var panel = $(event.currentTarget).data('panel');
				$('.slide-menu-toolbar > li').removeClass('active-toolbar-button');
				$('li[data-panel="' + panel + '"]').addClass('active-toolbar-button');
				$('.slide-menu-panel').removeClass('active-menu-panel');
				$('div[data-panel="' + panel + '"]').addClass('active-menu-panel');
			}


			$('<nav class="slide-menu slide-menu--' + side + '"></nav>')
				.appendTo($('.reveal'));
			$('<div class="slide-menu-overlay"></div>')
				.appendTo($('.reveal'))
				.click(closeMenu);

			var toolbar = $('<ol class="slide-menu-toolbar"></ol>').prependTo($('.slide-menu'));
			$('<li data-panel="Slides"><span class="slide-menu-toolbar-label">Slides</span><br/><i class="fa fa-list"></i></li>')
				.appendTo(toolbar)
				.addClass('active-toolbar-button')
				.click(openPanel);
			if (themes) {
				$('<li data-panel="Themes"><span class="slide-menu-toolbar-label">Themes</span><br/><i class="fa fa-desktop"></i></li>')
					.appendTo(toolbar)
					.click(openPanel);
			}
			if (transitions) {
				$('<li data-panel="Transitions"><span class="slide-menu-toolbar-label">Transitions</span><br/><i class="fa fa-arrows-h"></i></li>')
					.appendTo(toolbar)
					.click(openPanel);
			}
			$('<li id="close"><span class="slide-menu-toolbar-label">Close</span><br/><i class="fa fa-times"></i></li>')
				.appendTo(toolbar)
				.click(closeMenu);

			var panels = $('<div class="slide-menu-panels"></div>').appendTo($('.slide-menu'));

			//
			// Slide links
			//
			function item(type, section, i, h, v) {
				var link = '/#/' + h;
				if (v) link += '/' + v;
				else v = 0;

				var title = $(section).data('menu-title') ||
					$('.menu-title', section).text() ||
					$('h1, h2, h3, h4, h5, h6', section).text();
				if (!title) {
					title = "Slide " + i;
					type += ' no-title';
				}

				title = '<span class="slide-menu-item-title">' + title + '</span>';
				if (numbers) {
					// Number formatting taken from reveal.js

					// Default to only showing the current slide number
					var format = 'c';

					// Check if a custom slide number format is available
					if( typeof numbers === 'string' ) {
						format = numbers;
					}

					var n = format.replace( /h/g, h )
									.replace( /v/g, v )
									.replace( /c/g, i )
									.replace( /t/g, Reveal.getTotalSlides() );

					title = '<span class="slide-menu-item-number">' + n + '. </span>' + title;
				}

				var m = '';
				if (markers) {
					m = '<i class="fa fa-check-circle past"></i>' +
								'<i class="fa fa-dot-circle-o present"></i>' + 
								'<i class="fa fa-circle-thin future"></i>';
				}

				return '<li class="' + type + '" data-slide-h="' + h + '" data-slide-v="' + v + '">' + m + title + '</li>';
			}

			function clicked(event) {
				event.preventDefault();
				var elem = $(event.currentTarget);
				Reveal.slide(elem.data('slide-h'), elem.data('slide-v'));
				closeMenu();
			}

			function highlightCurrentSlide() {
				var state = Reveal.getState();
				$('li.slide-menu-item, li.slide-menu-item-vertical')
					.removeClass('past')
					.removeClass('present')
					.removeClass('future');

				$('li.slide-menu-item, li.slide-menu-item-vertical').each(function(e) {
					var h = $(e).data('slide-h');
					var v = $(e).data('slide-v');
					if (h < state.indexh || (h === state.indexh && v < state.indexv)) {
						$(e).addClass('past');
					}
					else if (h === state.indexh && v === state.indexv) {
						$(e).addClass('present');
					}
					else {
						$(e).addClass('future');
					}
				});
			}

			$('<div data-panel="Slides" class="slide-menu-panel"><ul class="slide-menu-items"></ul></div>')
				.appendTo(panels)
				.addClass('active-menu-panel');
			var items = $('.slide-menu-items');
			var count = 0;
			$('.slides > section').each(function(section, h) {
				var subsections = $('section', section);
				if (subsections.length > 0) {
					subsections.each(function(subsection, v) {
						count++;
						var type = (v === 0 ? 'slide-menu-item' : 'slide-menu-item-vertical');
						items.append(item(type, subsection, count, h, v));
					});
				} else {
					count++;
					var type = 'slide-menu-item';
					items.append(item(type, section, count, h));
				}
			});
			$('.slide-menu-item, .slide-menu-item-vertical').click(clicked);

			Reveal.addEventListener('slidechanged', highlightCurrentSlide);
			highlightCurrentSlide();

			//
			// Themes
			//
			function setTheme(event) {
				if (event) event.preventDefault();
				$('#theme').attr('href', $(event.currentTarget).data('theme'));
				closeMenu();
			}

			if (themes) {
				var panel = $('<div data-panel="Themes" class="slide-menu-panel"></div>').appendTo(panels);
				themes.forEach(function(t) {
					$('<li data-theme="' + t.theme + '">' + t.name + '</li>').appendTo(panel).click(setTheme);
				})
			}

			//
			// Transitions
			//
			function setTransition(event) {
				if (event) event.preventDefault();
				Reveal.configure({ transition: $(event.currentTarget).data('transition') });
				closeMenu();
			}

			if (transitions) {
				var panel = $('<div data-panel="Transitions" class="slide-menu-panel"></div>')
					.appendTo(panels);
				$('<li data-transition="none">None</li>').appendTo(panel).click(setTransition);
				$('<li data-transition="fade">Fade</li>').appendTo(panel).click(setTransition);
				$('<li data-transition="slide">Slide</li>').appendTo(panel).click(setTransition);
				$('<li data-transition="convex">Convex</li>').appendTo(panel).click(setTransition);
				$('<li data-transition="concave">Concave</li>').appendTo(panel).click(setTransition);
				$('<li data-transition="zoom">Zoom</li>').appendTo(panel).click(setTransition);
			}

			//
			// Open menu options
			//
			if (openButton) {
				// add menu button
				$('<div class="slide-menu-button"><a href="#"><i class="fa fa-bars"></i></a></div>')
					.appendTo($('.reveal'))
					.click(openMenu);
			}

			if (openSlideNumber) {
				// wrap slide number in link
				$('<div class="slide-number-wrapper"><a href="#"></a></div>').insertAfter($('div.slide-number'));
				$('.slide-number').appendTo($('.slide-number-wrapper a'));
				$('.slide-number-wrapper a').click(openMenu);
			}

			module.toggle = toggleMenu;
			module.isOpen = isOpen;
		}
	})
	})
	})
	});

	// modified from math plugin
	function loadResource( url, type, callback ) {
		var head = document.querySelector( 'head' );
		var resource;

		if ( type === 'script' ) {
			resource = document.createElement( 'script' );
			resource.type = 'text/javascript';
			resource.src = url;
		}
		else if ( type === 'stylesheet' ) {
			resource = document.createElement( 'link' );
			resource.rel = 'stylesheet';
			resource.href = url;
		}

		// Wrapper for callback to make sure it only fires once
		var finish = function() {
			if( typeof callback === 'function' ) {
				callback.call();
				callback = null;
			}
		}

		resource.onload = finish;

		// IE
		resource.onreadystatechange = function() {
			if ( this.readyState === 'loaded' ) {
				finish();
			}
		}

		// Normal browsers
		head.appendChild( resource );
	}

	function scriptPath() {
		// obtain plugin path from the script element
		var path;
		if (document.currentScript) {
			path = document.currentScript.src.slice(0, -7);
		} else {
			var sel = document.querySelector('script[src$="/menu.js"]')
			if (sel) {
				path = sel.src.slice(0, -7);
			}
		}
		return path;
	}

	return module;
})();
