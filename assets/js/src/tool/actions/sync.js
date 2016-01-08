var Sync = (function () {
	var fn = {};
	var types = {};
	var section;

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {
		$$$('[data-section="' + count + '"] .sync').click(function(e){
			section = count;
			fn.setTypes();
			fn.cases();
			dropdown.remove();
		});
	};

	// Set types
	fn.setTypes = function() {
		types[1] = $$$('[data-section="1"][data-type]')[0].getAttribute('data-type');
		types[2] = $$$('[data-section="2"][data-type]')[0].getAttribute('data-type');
	};

	// Cases
	fn.cases = function() {
		if( types[section] === 'panel' ) {
			SyncPanel.action(types[section], section);
		} else if( types[section] === 'site' ) {
			SiteSync.action(types[section], section);
		}
	};

	return fn;
})();