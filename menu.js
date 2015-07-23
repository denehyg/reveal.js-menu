/*
 * Reveal.js menu plugin
 * (c) Greg Denehy 2015
 */

// TODO
// Additional trigger options:
// - wrap the slide number in a link
// - hover zone at edge of slides
// - keypress to open/close menu (probably 'm' by default), and up/down/enter to select slide
// - via links in the slides, at least for demo purposes
// Add toolbar - slides | themes | transitions | close
// Cleanup styling/colours
// Allow class to specify which element provides the slide title (possibly hidden)

var RevealMenu = window.RevealMenu || (function(){
	var options = Reveal.getConfig().menu || {};
	options.path = options.path || 'plugin/menu';
	options.side = options.side || 'left';	// 'left' or 'right'
	options.effect = options.effect || 'slide';  // 'slide' or 'push'
	options.numbers = options.numbers || false;

	loadResource(options.path + '/jeesh.min.js', 'script', function() {
	loadResource(options.path + '/menu.css', 'stylesheet', function() {
	loadResource(options.path + '/font-awesome-4.3.0/css/font-awesome.min.css', 'stylesheet', function() {
		$('.reveal').after('<nav class="slide-menu slide-menu--' + options.effect + '-' + options.side + '"><ul class="slide-menu-items"></ul></nav>');
		$('.reveal').after('<div class="slide-menu-overlay"></div>');
		$('.slide-menu-overlay').click(closeMenu);

		$('.reveal').append('<div class="slide-menu-button"><a href="#"><i class="fa fa-bars"></i></a></div>');
		$('.slide-menu-button').click(openMenu);

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

		Reveal.addEventListener( 'slidechanged', highlightCurrentSlide);
		highlightCurrentSlide();

		function item(type, section, i, h, v) {
			var link = '/#/' + h;
			if (v) link += '/' + v;
			else v = 0;

			var title = $('> h1, > h2, > h3', section).text();
			if (!title) {
				title = "Slide " + i;
				type += ' no-title';
			}

			title = '<span class="slide-menu-item-title">' + title + '</span>';
			if (options.numbers) {
				title = '<span class="slide-menu-item-number">' + i + '. </span>' + title;
			}

			return '<li class="' + type + '">' + '<a href="' + link + '" data-slide-h="' + h + '" data-slide-v="' + v + '">' + title + '</a>' + '</li>';
		}

		function clicked(event) {
			event.preventDefault();
			// if user clicking on span text, get the data from the parent (a element)
			var h = event.srcElement.dataset.slideH || event.srcElement.parentElement.dataset.slideH;
			var v = event.srcElement.dataset.slideV || event.srcElement.parentElement.dataset.slideV;
			Reveal.slide(h, v);
			closeMenu();
		}

		function openMenu(event) {
			if (event) event.preventDefault();
		    $('body').addClass('slide-menu-active');
		    $('.reveal').addClass('has-' + options.effect + '-' + options.side);
		    $('.slide-menu').addClass('active');
		    $('.slide-menu-overlay').addClass('active');
		}

		function closeMenu(event) {
			if (event) event.preventDefault();
		    $('body').removeClass('slide-menu-active');
		    $('.reveal').removeClass('has-' + options.effect + '-' + options.side);
		    $('.slide-menu').removeClass('active');
		    $('.slide-menu-overlay').removeClass('active');
		}

		function highlightCurrentSlide() {
			var state = Reveal.getState();
			$('.slide-menu-items > li > a').removeClass('present');
			var sel = 'a[data-slide-h="' + state.indexh + '"][data-slide-v="' + state.indexv + '"]';
			$(sel).addClass('present');
		}
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

})();
