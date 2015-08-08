# reveal.js-menu

A slideout menu plugin for [Reveal.js](https://github.com/hakimel/reveal.js) to quickly jump to any slide by title. Also optionally change the theme and set the default transition. [Check out the live demo](https://denehyg.github.io/reveal.js-menu)

## Installation

### Bower

Download and install the package in your project:

```bower install reveal-js-menu```

Add the plugin to the dependencies in your presentation, as below. 

```javascript
Reveal.initialize({
	// ...
	
	dependencies: [
		// ... 
	  
		{ src: 'bower_components/reveal-js-menu/menu.js' }
	]
});
```

### Manual

Copy this repository into the plugins folder of your reveal.js presentation, ie ```plugins/menu```.

Add the plugin to the dependencies in your presentation, as below. 

```javascript
Reveal.initialize({
	// ...
	
	dependencies: [
		// ... 
	  
		{ src: 'plugin/menu/menu.js' }
	]
});
```

## Configuration

You can configure the menu for your presentation by providing a ```menu``` option in the reveal.js initialization options. Note that all config values are optional and will default as specified below.


```javascript
Reveal.initialize({
	// ...

	menu: {
		// Specifies which side of the presentation the menu will 
		// be shown. Use 'left' or 'right'.
		side: 'left',

		// Add slide numbers to the titles in the slide list.
		// Use 'true' or format string (same as reveal.js slide numbers)
		numbers: false,

		// Add markers to the slide titles to indicate the 
		// progress through the presentation
		markers: false,

		// Specifies the themes that will be available in the themes
		// menu panel. Set to 'false' to hide themes panel.
		themes: [
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
		],

		// Specifies if the transitions menu panel will be shown.
		transitions: true,

		// Adds a menu button to the slides to open the menu panel.
		// Set to 'false' to hide the button.
		openButton: true,

		// If 'true' allows the slide number in the presentation to
		// open the menu panel. The reveal.js slideNumber option must 
		// be displayed for this to take effect
		openSlideNumber: false
	},

});
```

## Slide Titles

The slide titles used in the menu can be supplied explicitly or are taken directly from the presentation, using the following rules...

###### 1. The section's ```data-menu-title``` attribute.
If the slide's section element contains a ```data-menu-title``` attribute this will be used for the slide title in the menu. For example...

```html
<section data-menu-title="Custom Menu Title">
	<h1>Title</h1>
	<p>...</p>
</section>
```

###### 2. Any element with the class ```menu-title```.
If the slide's section contains an element with the class ```menu-title``` then the element's text will be used for the title. The first such element found will be used if there are more than one. Note the element need not be displayed to be used. For example...

```html
<section>
	<h1>Title</h1>
	<span class="menu-title" style="display: none">Custom Menu Title</span>
	<p>...</p>
</section>
```

###### 3. The first heading found
If not explicitly specified (as above), the title will be taken from the first heading element found in the slide. For example...

```html
<section>
	<h3>This will be the slide title in the menu</h3>
	<h1>Title</h1>
	<p>...</p>
</section>
```

###### 4. No title is provided
If no title can be found using the above methods, a default title incorporating the slide number will be used. For example, the following would result in a slide title in the format of 'Slide 12'...

```html
<section>
	<p>...</p>
</section>
```


## License

MIT licensed

Copyright (C) 2015 Greg Denehy
