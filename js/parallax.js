$(function() { // onDomReady
		
	$(window).scrollAnimate({
		'#a, #b': {
			backgroundPosition: {
				start: '0px 0px',
				end: '0px 200px'
			}
		},
		'body': {
			backgroundPosition: {
				start: '0px 300px',
				end: '0px 0px'
			}
		}
	});
	
});
