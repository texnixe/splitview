var copy = (function () {
	var fn = {};
	var _section_current;
	var _section_target;

	// Init
	fn.init = function() {
		events();
	};

	// Events
	var events = function() {
		for (var i = 1; i < url.length; i++) {
			event(i);
		}
	};

	// Event
	var event = function(count) {
		$$$('[data-section="' + count + '"] .flash .copy').click(function(e){
			_section_current = count;
			fn.setSectionTarget();
			fn.render();
			dropdown.remove();
		});
	};
<<<<<<< HEAD

	// Render
	fn.render = function() {
		var get_iframe = $$$('[data-section="' + _section_current + '"] iframe')[0];
		var set_iframe = $$$('[data-section="' + _section_target + '"] iframe')[0];
		var get_url = get_iframe.contentWindow.document.location.href;
		set_iframe.contentWindow.document.location.href = get_url;
	};

	// Set section target
	fn.setSectionTarget = function() {
		_section_target = ( _section_current === 1 ) ? 2 : 1;
	};

=======

	// Panel to site
	var panelToSite = function() {
		var panel = $$$('section.panel iframe')[0].contentWindow.document.location.href;
		$$$('section.site iframe')[0].contentWindow.document.location.href = panel;
	};

	// Site to panel
	var siteToPanel = function() {
		var site = $$$('section.site iframe')[0].contentWindow.document.location.href;
		$$$('section.panel iframe')[0].contentWindow.document.location.href = site;
	};
>>>>>>> origin/master
	return fn;
})();