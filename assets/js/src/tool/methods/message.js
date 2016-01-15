var message = (function () {
	var fn = {};

	fn.hide = function(selector) {
		var style_element = document.createElement('style');
		var node = $(selector + ' iframe')[0].contentWindow.document.querySelector('body').appendChild(style_element);
		node.innerHTML = '.message { display: none; }';
	};

	return fn;
})();

var messages = (function () {
	var fn = {};

	fn.hide = function() {
		for (var i = 1; i < url.length; i++) {
			message.hide('[data-section="' + i + '"]');
		}
	};

	return fn;
})();