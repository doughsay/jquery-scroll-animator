var ScrollAnimator = function(definitions) {
	
	/// Globals ///
	var w = $(window), d = $(document),
	height, position, negPosition; 
	
	
	/// Utility functions ///
	
	function getColorFromString(string) {
		var colorNames = {
			aliceblue:'#f0f8ff',antiquewhite:'#faebd7',aqua:'#00ffff',aquamarine:'#7fffd4',azure:'#f0ffff',beige:'#f5f5dc',bisque:'#ffe4c4',black:'#000000',blanchedalmond:'#ffebcd',blue:'#0000ff',blueviolet:'#8a2be2',brown:'#a52a2a',burlywood:'#deb887',cadetblue:'#5f9ea0',chartreuse:'#7fff00',chocolate:'#d2691e',coral:'#ff7f50',cornflowerblue:'#6495ed',cornsilk:'#fff8dc',crimson:'#dc143c',cyan:'#00ffff',darkblue:'#00008b',darkcyan:'#008b8b',darkgoldenrod:'#b8860b',darkgray:'#a9a9a9',darkgreen:'#006400',darkkhaki:'#bdb76b',darkmagenta:'#8b008b',darkolivegreen:'#556b2f',darkorange:'#ff8c00',darkorchid:'#9932cc',darkred:'#8b0000',darksalmon:'#e9967a',darkseagreen:'#8fbc8f',darkslateblue:'#483d8b',darkslategray:'#2f4f4f',darkturquoise:'#00ced1',darkviolet:'#9400d3',deeppink:'#ff1493',deepskyblue:'#00bfff',dimgray:'#696969',dodgerblue:'#1e90ff',firebrick:'#b22222',floralwhite:'#fffaf0',forestgreen:'#228b22',fuchsia:'#ff00ff',gainsboro:'#dcdcdc',ghostwhite:'#f8f8ff',gold:'#ffd700',goldenrod:'#daa520',gray:'#808080',green:'#008000',greenyellow:'#adff2f',honeydew:'#f0fff0',hotpink:'#ff69b4',indianred:'#cd5c5c',indigo:'#4b0082',ivory:'#fffff0',khaki:'#f0e68c',lavender:'#e6e6fa',lavenderblush:'#fff0f5',lawngreen:'#7cfc00',lemonchiffon:'#fffacd',lightblue:'#add8e6',lightcoral:'#f08080',lightcyan:'#e0ffff',lightgoldenrodyellow:'#fafad2',lightgrey:'#d3d3d3',lightgreen:'#90ee90',lightpink:'#ffb6c1',lightsalmon:'#ffa07a',lightseagreen:'#20b2aa',lightskyblue:'#87cefa',lightslategray:'#778899',lightsteelblue:'#b0c4de',lightyellow:'#ffffe0',lime:'#00ff00',limegreen:'#32cd32',linen:'#faf0e6',magenta:'#ff00ff',maroon:'#800000',mediumaquamarine:'#66cdaa',mediumblue:'#0000cd',mediumorchid:'#ba55d3',mediumpurple:'#9370d8',mediumseagreen:'#3cb371',mediumslateblue:'#7b68ee',mediumspringgreen:'#00fa9a',mediumturquoise:'#48d1cc',mediumvioletred:'#c71585',midnightblue:'#191970',mintcream:'#f5fffa',mistyrose:'#ffe4e1',moccasin:'#ffe4b5',navajowhite:'#ffdead',navy:'#000080',oldlace:'#fdf5e6',olive:'#808000',olivedrab:'#6b8e23',orange:'#ffa500',orangered:'#ff4500',orchid:'#da70d6',palegoldenrod:'#eee8aa',palegreen:'#98fb98',paleturquoise:'#afeeee',palevioletred:'#d87093',papayawhip:'#ffefd5',peachpuff:'#ffdab9',peru:'#cd853f',pink:'#ffc0cb',plum:'#dda0dd',powderblue:'#b0e0e6',purple:'#800080',red:'#ff0000',rosybrown:'#bc8f8f',royalblue:'#4169e1',saddlebrown:'#8b4513',salmon:'#fa8072',sandybrown:'#f4a460',seagreen:'#2e8b57',seashell:'#fff5ee',sienna:'#a0522d',silver:'#c0c0c0',skyblue:'#87ceeb',slateblue:'#6a5acd',slategray:'#708090',snow:'#fffafa',springgreen:'#00ff7f',steelblue:'#4682b4',tan:'#d2b48c',teal:'#008080',thistle:'#d8bfd8',tomato:'#ff6347',turquoise:'#40e0d0',violet:'#ee82ee',wheat:'#f5deb3',white:'#ffffff',whitesmoke:'#f5f5f5',yellow:'#ffff00',yellowgreen:'#9acd32'
		}
		var color = {r:0,g:0,b:0};
		
		var regex = {
			hex: /#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/,
			rgbi: /rgb\(([0-9]+),\s?([0-9]+),\s?([0-9]+)\)/,
			rgbp: /rgb\(([0-9]+)%,\s?([0-9]+)%,\s?([0-9]+)%\)/
		}
		
		string = string.toLowerCase();
		if(colorNames[string] !== undefined)
			string = colorNames[string];
		
		if(regex.hex.test(string)) {
			color.r = parseInt('0x'+string.slice(1,3));
			color.g = parseInt('0x'+string.slice(3,5));
			color.b = parseInt('0x'+string.slice(5,7));
		} else if(regex.rgbi.test(string)) {
			var stuff = regex.rgbi.exec(string);
			color.r = parseInt(stuff[1]);
			color.g = parseInt(stuff[2]);
			color.b = parseInt(stuff[3]);
		} else if(regex.rgbp.test(string)) {
			var stuff = regex.rgbp.exec(string);
			color.r = Math.round(parseInt(stuff[1]) * 2.55);
			color.g = Math.round(parseInt(stuff[2]) * 2.55);
			color.b = Math.round(parseInt(stuff[3]) * 2.55);
		}
		return color;
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
		if(/color/i.test(attribute)) return animateColor(attribute, options);
		else return animateValue(attribute, options);
	}
	
	function animateColor(attribute, options) {
		var start = getColorFromString(options.start);
		var end = getColorFromString(options.end);
		var c = {
			r: Math.round(val(start.r, end.r)),
			g: Math.round(val(start.g, end.g)),
			b: Math.round(val(start.b, end.b))
		}
		return 'rgb('+c.r+','+c.g+','+c.b+')';
	}
	
	function animateValue(attribute, options) {
		console.log('the numbers!');
		return '';
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
		console.log('init!');
		$.each(definitions, function(selector, attributes) {
			var css = {};
			$.each(attributes, function(attribute, options) {
				css[attribute] = options.start;
			});
			console.log(selector, css);
			$(selector).css(css); // NOTE:  let's see if we can pre-query all the selectors
														 //				 so we don't run the same query over and over
		});
	}
	
	init();
	$(window).scroll(onScroll);
	
}

$(function() {
	ScrollAnimator({
		'body': {
			backgroundColor: {
				start: 'black',
				end: 'rgb(255,165,0)'
			},
			color: {
				start: '#000000',
				end: 'orange'
			}
		},
		'#Container': {
			backgroundColor: {
				start: 'dodgerblue',
				end: 'black'
			},
			borderColor: {
				start: 'rgb(100%,100%,100%)',
				end: 'dodgerblue'
			},
			borderWidth: {
				start: '5px',
				end: '10px'
			}
		}
	});
});

// proposed future syntax:
/*
$(window).scrollAnimate({
	'body': {
		color: {
			start: 'black',
			end: 'white'
		}
	}
});
*/
