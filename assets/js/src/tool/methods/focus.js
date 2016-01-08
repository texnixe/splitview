var focus = (function () {
	var fn = {};

	// FocusRootOnLoad
	fn.rootOnLoad = function(selector) {
		iframe = $$$(selector + ' iframe')[0];
		iframe.onload = function() {
			iframe_count++;
			if(iframe_count == 2) {
				fn.root();
				messages.hide();
				timeloop.events();
			}
		};
	};

	fn.rootsOnLoad = function() {
		for (var i = 1; i < url.length; i++) {
			fn.rootOnLoad('[data-section="' + i + '"]');
		}
	};

	// Force focus
	fn.render = function(selector) {
		$$$(selector).focus();
	};

	// Set focus on root
	fn.root = function() {
		blur.render('section.panel iframe');
		blur.render('section.site iframe');
		focus.render('.splitview');
	};

	return fn;
})();