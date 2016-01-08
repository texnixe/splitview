var address = (function () {
	var fn = {};

<<<<<<< HEAD
	// Render address
	fn.render = function(selector, value) {
		$$$(selector + ' .url input')[0].value = value;
	};

	fn.update = function(selector, value, key) {
		var new_url = $$$(selector + ' iframe')[0].contentWindow.location.href;
		if( new_url != value ) {
			fn.render(selector, new_url );
			url[key] = new_url;
		}
	};

	return fn;
})();
=======
	// Init
	fn.init = function() {
		address.setAddress( 'section.panel .url input', panel_url );
		address.setAddress( 'section.site .url input', site_url );
	};

	// Set input url
	fn.setAddress = function(selector, value) {
		$$$(selector)[0].value = value;
	};
>>>>>>> origin/master

// Iframes loops
var addresses = (function () {
	var fn = {};

	fn.render = function() {
		for (var i = 1; i < url.length; i++) {
			address.render('[data-section="' + i + '"]', url[i]);
		}
	};

	fn.update = function() {
		for (var i = 1; i < url.length; i++) {
			address.update('[data-section="' + i + '"]', url[i], i);
		}
	};

	return fn;
})()