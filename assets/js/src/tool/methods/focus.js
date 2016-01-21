var focus = (function () {
	var fn = {};

	// FocusRootOnLoad
	fn.rootOnLoad = function(selector) {
		iframe = $(selector + ' iframe')[0];
		iframe.onload = function() {
			iframe_count++;
			if(iframe_count == 2) {
				fn.root();
				messages.hide();
				timeloop.events();


				//history.pushState({}, 'Splitview', data['root_url'] + '/splitview/');
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
		$(selector).focus();
	};

	// Set focus on root
	fn.root = function() {
		blur.render('[data-section="1"] iframe');
		blur.render('[data-section="2"] iframe');
		focus.render('.splitview');
	};

	return fn;
})();