var data = {};
var iframe_count = 0;
var panel_url;
var site_url;
var panel_state;
var panel_refreshed = true;
var memory = {};

var splitview = (function () {
	var fn = {};

	// Init
	fn.init = function (options) {
		panel.init();

		action.setup(options);
		action.debugData();

		action.addIframe('section.panel .iframe', panel_url );
		action.addIframe('section.site .iframe', site_url );

		menu.init();
		dropdown.init();
		address.init();
		surface.init();
		mem.init();
		copy.init();
		SiteSync.init();

		event.events();
	}

	return fn;
})();