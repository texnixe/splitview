var AutoSync = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {
		$('[data-section="' + count + '"] .autosync').click(function(e){
			if( autosync[count] === false ) {
				$('[data-section="' + count + '"]')[0].setAttribute('data-autosync', '');
				autosync[count] = true;
			} else {
				$('[data-section="' + count + '"]')[0].removeAttribute('data-autosync');
				autosync[count] = false;
			}
			dropdown.remove();
		});
	};

	return fn;
})();