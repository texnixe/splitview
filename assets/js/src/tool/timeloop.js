var timeloop = (function () {
	var fn = {};

	fn.events = function() {
		address.setAddresses();
		panel.triggerSavedMessage();
		panel.triggerErrorMessage();

		setTimeout(timeloop.events, 200);
	}

	return fn;
})();