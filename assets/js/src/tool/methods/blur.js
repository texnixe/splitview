var blur = (function () {
	var fn = {};

	// Force blur
	fn.render = function(selector) {
		$(selector).blur();
	};

	return fn;
})();