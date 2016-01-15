var Refresh = (function () {
	var fn = {};
	var _section;

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {
		$('[data-section="' + count + '"] .refresh').click(function(e){
			_section = count;
			fn.action(_section);
			dropdown.remove();
		});
	};

	// Refresh
	fn.action = function(section) {
		$('[data-section="' + section + '"] iframe')[0].contentWindow.location.reload();
	};

	return fn;
})();