var data = {};
var iframe_count = 0;
//var panel_url;
//var site_url;
var url = [];
var panel_state;
var panel_refreshed = true;
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
		Show.init();
		

		Sync.init();
		Refresh.init();

		view.init();
		exit.init();
	};

	return fn;
})();