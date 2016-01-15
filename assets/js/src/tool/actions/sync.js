var Sync = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {
		$('[data-section="' + count + '"] .sync').click(function(e){
			fn.action(count);
			dropdown.remove();
		});
	};

	// Action
	fn.action = function(section) {
		var types = fn.setTypes();
		fn.cases(section, types);
	};

	// Set types
	fn.setTypes = function() {
		var types = [];
		types[1] = $('[data-section="1"][data-type]')[0].getAttribute('data-type');
		types[2] = $('[data-section="2"][data-type]')[0].getAttribute('data-type');
		return types;
	};

	// Cases
	fn.cases = function(section, types) {
		if( types[section] === 'panel' ) {
			SyncPanel.action(types[section], section);
		} else if( types[section] === 'site' ) {
			SiteSync.action(types[section], section);
		}
	};

	return fn;
})();