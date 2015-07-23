/*
 * Reveal.js menu plugin
 * (c) Greg Denehy 2015
 */

// TODO
// Additional trigger options:
// - wrap the slide number in a link
// - hover zone at edge of slides
// - keypress (probably 'm' by default)
// - via links in the slides, at least for demo purposes
// Add option for slide numbers in slide links
// Add toolbar - slides | themes | transitions | close
// Cleanup styling/colours
// Highlight link that matches current slide
// Allow class to specify which element provides the slide title (possibly hidden)
// Provide fallback slide link when no slide title is provided

var RevealMenu = window.RevealMenu || (function(){
	var options = Reveal.getConfig().menu || {};
	options.path = options.path || 'plugin/menu';
	options.side = options.side || 'left';	// 'left' or 'right'
	options.effect = options.effect || 'slide';  // 'slide' or 'push'

	loadResource(options.path + '/jeesh.min.js', 'script', function() {
	loadResource(options.path + '/menu.css', 'stylesheet', function() {
	loadResource(options.path + '/font-awesome-4.3.0/css/font-awesome.min.css', 'stylesheet', function() {
		$('.reveal').after('<nav class="slide-menu slide-menu--' + options.effect + '-' + options.side + '"><ul class="slide-menu-items"></ul></nav>');
		$('.reveal').after('<div class="slide-menu-overlay"></div>');
		$('.slide-menu-overlay').click(closeMenu);

		$('.reveal').append('<div class="slide-menu-button"><a href="#"><i class="fa fa-bars"></i></a></div>');
		$('.slide-menu-button').click(openMenu);

		var items = $('.slide-menu-items');
		$('.slides > section').each(function(d, h) {
			var title = $('> h1, > h2, > h3', d).text();
			var subsections = $('section', d);
			if (subsections.length > 0) {
				subsections.each(function(e, v) {
					var subtitle = $('h1,h2,h3', e).text();
					var type = (v === 0 ? 'slide-menu-item' : 'slide-menu-item-vertical');
					items.append('<li class="' + type + '">' + itemLink(subtitle, h, v) + '</li>');
				});
			} else {
				items.append('<li class="slide-menu-item">' + itemLink(title, h) + '</li>');
			}
		});
		$('.slide-menu-item, .slide-menu-item-vertical').click(clicked);

		function itemLink(title, h, v) {
			var link = '/#/' + h;
			if (v) link += '/' + v;
			else v = 0;
			return '<a href="' + link + '" data-slide-h="' + h + '" data-slide-v="' + v + '">' + title + '</a>';
		}

		function clicked(event) {
			event.preventDefault();
			Reveal.slide(event.srcElement.dataset.slideH, event.srcElement.dataset.slideV);
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
