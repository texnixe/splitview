var flip = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		events();
	};

	// Events
	var events = function() {
		$$$('.bar .flip').click(function(e){
			flip();
			dropdown.remove();
		});
	};

	// Flip
	var flip = function() {
		if( $$$('body')[0].getAttribute('data-flip') != 'true' ) {
			$$$('body')[0].setAttribute('data-flip', 'true');
		} else {
			$$$('body')[0].setAttribute('data-flip', 'false');
		}
	};

	return fn;
})();