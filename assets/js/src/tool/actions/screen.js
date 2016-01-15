var Screen = (function () {
	var fn = {};

	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {
		$('[data-section="' + count + '"] .screen .button').click(function(e){
			if( $('[data-dropdown="screen"]') ) {
				var width = $('[data-section="' + count + '"]')[0].offsetWidth;
				$('[data-section="' + count + '"] .screen input')[0].value = width;
			}
		});
	};

	return fn;
})();