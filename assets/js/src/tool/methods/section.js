var section = (function () {
	var fn = {};

	fn.update = function() {
		for (var i = 1; i < url.length; i++) {
			type('[data-section="' + i + '"]', url[i], i);
		}
	};

	var type = function(selector, value, key) {
		site(selector, value, key);
		panel(selector, value, key);
	};

	var site = function(selector, value, key) {
		var element = $(selector + ' iframe')[0].contentWindow.document.querySelector('.splitview-data');
		if( element ) {
			var attribute = $(selector)[0].getAttribute('data-type');
			if( attribute !== 'site') {
				$(selector)[0].setAttribute('data-type', 'site');
			}
		}
	};

	var panel = function(selector, value, key) {
		var element = $(selector + ' iframe')[0].contentWindow.document.querySelector('title');
		if( element && element.innerHTML.substr(-8) == ' | Panel' ) {
			var attribute = $(selector)[0].getAttribute('data-type');
			if( attribute !== 'panel') {
				$(selector)[0].setAttribute('data-type', 'panel');
			}
		}
	};

	return fn;
})();