jQuery.fn.scrollAnimate = function(definitions) {
	
	/// Globals ///
	var w = $(window), d = $(document),
	height, position;
	
	/// Utility functions ///
	
	function getColorFromString(string) {
		var colorNames = {
			aliceblue:'#f0f8ff',
			antiquewhite:'#faebd7',
			aqua:'#00ffff',
			aquamarine:'#7fffd4',
			azure:'#f0ffff',
			beige:'#f5f5dc',
			bisque:'#ffe4c4',
			black:'#000000',
			blanchedalmond:'#ffebcd',
			blue:'#0000ff',
			blueviolet:'#8a2be2',
			brown:'#a52a2a',
			burlywood:'#deb887',
			cadetblue:'#5f9ea0',
			chartreuse:'#7fff00',
			chocolate:'#d2691e',
			coral:'#ff7f50',
			cornflowerblue:'#6495ed',
			cornsilk:'#fff8dc',
			crimson:'#dc143c',
			cyan:'#00ffff',
			darkblue:'#00008b',
			darkcyan:'#008b8b',
			darkgoldenrod:'#b8860b',
			darkgray:'#a9a9a9',
			darkgreen:'#006400',
			darkkhaki:'#bdb76b',
			darkmagenta:'#8b008b',
			darkolivegreen:'#556b2f',
			darkorange:'#ff8c00',
			darkorchid:'#9932cc',
			darkred:'#8b0000',
			darksalmon:'#e9967a',
			darkseagreen:'#8fbc8f',
			darkslateblue:'#483d8b',
			darkslategray:'#2f4f4f',
			darkturquoise:'#00ced1',
			darkviolet:'#9400d3',
			deeppink:'#ff1493',
			deepskyblue:'#00bfff',
			dimgray:'#696969',
			dodgerblue:'#1e90ff',
			firebrick:'#b22222',
			floralwhite:'#fffaf0',
			forestgreen:'#228b22',
			fuchsia:'#ff00ff',
			gainsboro:'#dcdcdc',
			ghostwhite:'#f8f8ff',
			gold:'#ffd700',
			goldenrod:'#daa520',
			gray:'#808080',
			green:'#008000',
			greenyellow:'#adff2f',
			honeydew:'#f0fff0',
			hotpink:'#ff69b4',
			indianred:'#cd5c5c',
			indigo:'#4b0082',
			ivory:'#fffff0',
			khaki:'#f0e68c',
			lavender:'#e6e6fa',
			lavenderblush:'#fff0f5',
			lawngreen:'#7cfc00',
			lemonchiffon:'#fffacd',
			lightblue:'#add8e6',
			lightcoral:'#f08080',
			lightcyan:'#e0ffff',
			lightgoldenrodyellow:'#fafad2',
			lightgrey:'#d3d3d3',
			lightgreen:'#90ee90',
			lightpink:'#ffb6c1',
			lightsalmon:'#ffa07a',
			lightseagreen:'#20b2aa',
			lightskyblue:'#87cefa',
			lightslategray:'#778899',
			lightsteelblue:'#b0c4de',
			lightyellow:'#ffffe0',
			lime:'#00ff00',
			limegreen:'#32cd32',
			linen:'#faf0e6',
			magenta:'#ff00ff',
			maroon:'#800000',
			mediumaquamarine:'#66cdaa',
			mediumblue:'#0000cd',
			mediumorchid:'#ba55d3',
			mediumpurple:'#9370d8',
			mediumseagreen:'#3cb371',
			mediumslateblue:'#7b68ee',
			mediumspringgreen:'#00fa9a',
			mediumturquoise:'#48d1cc',
			mediumvioletred:'#c71585',
			midnightblue:'#191970',
			mintcream:'#f5fffa',
			mistyrose:'#ffe4e1',
			moccasin:'#ffe4b5',
			navajowhite:'#ffdead',
			navy:'#000080',
			oldlace:'#fdf5e6',
			olive:'#808000',
			olivedrab:'#6b8e23',
			orange:'#ffa500',
			orangered:'#ff4500',
			orchid:'#da70d6',
			palegoldenrod:'#eee8aa',
			palegreen:'#98fb98',
			paleturquoise:'#afeeee',
			palevioletred:'#d87093',
			papayawhip:'#ffefd5',
			peachpuff:'#ffdab9',
			peru:'#cd853f',
			pink:'#ffc0cb',
			plum:'#dda0dd',
			powderblue:'#b0e0e6',
			purple:'#800080',
			red:'#ff0000',
			rosybrown:'#bc8f8f',
			royalblue:'#4169e1',
			saddlebrown:'#8b4513',
			salmon:'#fa8072',
			sandybrown:'#f4a460',
			seagreen:'#2e8b57',
			seashell:'#fff5ee',
			sienna:'#a0522d',
			silver:'#c0c0c0',
			skyblue:'#87ceeb',
			slateblue:'#6a5acd',
			slategray:'#708090',
			snow:'#fffafa',
			springgreen:'#00ff7f',
			steelblue:'#4682b4',
			tan:'#d2b48c',
			teal:'#008080',
			thistle:'#d8bfd8',
			tomato:'#ff6347',
			turquoise:'#40e0d0',
			violet:'#ee82ee',
			wheat:'#f5deb3',
			white:'#ffffff',
			whitesmoke:'#f5f5f5',
			yellow:'#ffff00',
			yellowgreen:'#9acd32'
		}
		var color = {r:0,g:0,b:0};
		
		var regex = {
			hex: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/,
			rgbi: /^rgb\(([0-9]+),\s?([0-9]+),\s?([0-9]+)\)$/,
			rgbp: /^rgb\(([0-9]+)%,\s?([0-9]+)%,\s?([0-9]+)%\)$/
		}
		
		string = string.toLowerCase();
		if(colorNames[string] !== undefined)
			string = colorNames[string];
		
		if(regex.hex.test(string)) {
			var matchData = regex.hex.exec(string);
			color.r = parseInt('0x'+matchData[1]);
			color.g = parseInt('0x'+matchData[2]);
			color.b = parseInt('0x'+matchData[3]);
		} else if(regex.rgbi.test(string)) {
			var matchData = regex.rgbi.exec(string);
			color.r = parseInt(matchData[1]);
			color.g = parseInt(matchData[2]);
			color.b = parseInt(matchData[3]);
		} else if(regex.rgbp.test(string)) {
			var matchData = regex.rgbp.exec(string);
			color.r = Math.round(parseInt(matchData[1]) * 2.55);
			color.g = Math.round(parseInt(matchData[2]) * 2.55);
			color.b = Math.round(parseInt(matchData[3]) * 2.55);
		} else throw "Invalid color string: " + string;
		return color;
	}
	
	function fallback(a, b) {
		return a ? a : b;
	}
	
	function val(start, end) {
		if(end > start) {
			var diff = end - start;
			return start + (diff * position)
		} else if(start > end) {
			var diff = start - end;
			return (diff * (position - 1) * -1) + end;
		} else {
			return start;
		}
	}
	
	/// Animation Methods ///
	
	function animate(attribute, options) {
		if(/color/i.test(attribute)) return animateColor(options);
		else return animateValue(options);
	}
	
	function animateColor(options) {
		var start = getColorFromString(options.start);
		var end = getColorFromString(options.end);
		var c = {
			r: Math.round(val(start.r, end.r)),
			g: Math.round(val(start.g, end.g)),
			b: Math.round(val(start.b, end.b))
		}
		return 'rgb('+c.r+','+c.g+','+c.b+')';
	}
	
	function animateValue(options) {
		var startVals = options.start.split(' ');
		var endVals = options.end.split(' ');
		var regex = /^([.0-9]+)(|%|in|cm|mm|em|ex|pt|pc|px)$/
		var newVals = [];
		
		if(startVals.length !== endVals.length)
			throw "The number of start values and end values does not match";
		
		for(var i = 0, L = startVals.length; i < L; i++) {
			var startMatchData = regex.exec(startVals[i]);
			var startVal = parseInt(startMatchData[1]);
			var startUnit = fallback(startMatchData[2], '');
			var endMatchData = regex.exec(endVals[i]);
			var endVal = parseInt(endMatchData[1]);
			var endUnit = fallback(endMatchData[2], '');
			
			if(startUnit !== endUnit)
				throw "Sorry, I don't (yet) support unmatched units "
					+ startUnit + " and " + endUnit;
				
					newVals[i] = val(startVal, endVal).toFixed(2) + startUnit;
		}
				
		return newVals.join(' ');
	}
	
	/// Scroll Callback ///
	
	function onScroll() {
		height = d.height() - w.height();
		position = w.scrollTop() / height;
		
		$.each(definitions, function(selector, attributes) {
			var css = {};
			$.each(attributes, function(attribute, options) {
				css[attribute] = animate(attribute, options);
			});
			$(selector).css(css);
		});
		
	}
	
	/// Initialization ///
	
	function init() {
		$.each(definitions, function(selector, attributes) {
			var css = {};
			$.each(attributes, function(attribute, options) {
				css[attribute] = options.start;
			});
			$(selector).css(css);
		});
	}
	
	init();
	this.scroll(onScroll);
	
};
