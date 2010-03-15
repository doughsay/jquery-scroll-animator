$(function() { // onDomReady
		
	/*
	
		Example usage of scrollAnimate shown below.
		Just call scrollAnimate on the element you wish to watch for scroll events
		on and pass in a definition object.
		
		Definition object looks like this:
		
		selector: {
			attribute: {
				start: theStartValue,
				end: theEndValue
			},
			anotherAttribute: {
				start: theStartValue,
				end: theEndValue
			},
			etc...
		},
		anotherSelector: {
			attribute: {
				start: theStartValue,
				end: theEndValue
			},
			etc...
		},
		etc...
		
	*/
		
	$(window).scrollAnimate({
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
				end: '100px'
			}
		},
		'h2': {
			letterSpacing: {
				start: '0px',
				end: '40px'
			}
		}
	});
	
});
