var timeloop = (function () {
	var fn = {};

	fn.events = function() {
		section.update();
		addresses.update();
		Save.init();
		Error.init();

		setTimeout(fn.events, 200);
	};

	return fn;
})();