var data = {};
var iframe_count = 0;
//var panel_url;
//var site_url;
var url = [];
var panel_state;
var panel_refreshed = true;
var autosync = [];
autosync[1] = false;
autosync[2] = false;
var memory = {};

var splitview = (function () {
	var fn = {};

	// Init
	fn.init = function (options) {
		setup.init(options);
		action.debugData();

		iframes.render();
		addresses.render();

		dropdowns.toggle();
		dropdown.eventRemove();
		focus.rootsOnLoad();
		mem.init();

		// Actions
		copy.init();
		flip.init();

		InputEnter.init();
		InputClick.init();
		InputHover.init();
		Show.init();
		

		Sync.init();
		Refresh.init();
		AutoSync.init();
		Zoom.init();

		view.init();
		exit.init();
		Screen.init();
		Width.init();
	};

	return fn;
})();