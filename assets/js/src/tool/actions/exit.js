var exit = (function () {
	var fn = {};

	fn.init = function() {
		events();
	};

	var events = function() {
		event('1');
		event('2');
	};

	var event = function(key) {
		$('[data-section="' + key + '"] li.exit').click(function(e){
			var new_url = $('[data-section="' + key + '"] iframe')[0].contentWindow.document.location.href;

			// Middle click
			if( e.which == 2 ) {
				e.preventDefault();
				locationTab(new_url);
			} else {
				locationSelf(new_url);
			}
		});
	};

	// Location tab
	var locationTab = function(new_url) {
		var win = window.open(new_url, '_blank');
		win.focus();
	};

	// Location self
	var locationSelf = function(new_url) {
		window.location.href = new_url;
	};

	return fn;
})();