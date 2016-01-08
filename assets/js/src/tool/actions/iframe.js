var iframe = (function () {
	var fn = {};

	// Add iframe to selector
	fn.render = function(selector, value) {
		var iframe = document.createElement('iframe');
		iframe.src = value;
		$$$(selector + ' .iframe')[0].appendChild(iframe);
		return iframe;
	};

	return fn;
})();

// Iframes loops
var iframes = (function () {
	var fn = {};

	fn.render = function() {
		for (var i = 1; i < url.length; i++) {
			iframe.render('[data-section="' + i + '"]', url[i]);
		}
	};

	return fn;
})()