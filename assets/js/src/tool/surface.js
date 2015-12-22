var surface = (function () {
	var fn = {};

	fn.init = function() {
		surface.focusRootOnLoad('section.panel iframe');
		surface.focusRootOnLoad('section.site iframe');
	}

	// Force focus
	fn.focus = function(selector) {
		$$$(selector).focus();
	}

	// Force blur
	fn.blur = function(selector) {
		$$$(selector).blur();
	}

	// Set focus on root
	fn.focusRoot = function() {
		surface.blur('section.panel iframe');
		surface.blur('section.site iframe');
		surface.focus('.splitview');
	}

	// FocusRootOnLoad
	fn.focusRootOnLoad = function(selector) {
		iframe = $$$(selector)[0];
		iframe.onload = function() {
			iframe_count++;
			if(iframe_count == 2) {
				surface.focusRoot();
				panel.panelMessageHide();
				timeloop.events();
			}
		};
	}

	return fn;
})();