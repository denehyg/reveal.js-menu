# reveal.js-menu

A slideout menu plugin for [Reveal.js](https://github.com/hakimel/reveal.js) to quickly jump to any slide by title. Also optionally change the theme and set the default transition.

## Installation

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

## License

MIT licensed

Copyright (C) 2015 Greg Denehy
