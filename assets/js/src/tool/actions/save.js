var Save = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {
		fn.onSave(count);
	};

	// On save
	fn.onSave = function(count) {
		var element = $('[data-section="' + count + '"] iframe')[0].contentWindow.document.querySelector('.message-is-notice');
		if( element ) {
			panel_state = 'saved';
		} else {
			panel_refreshed = false;
			panel_state = 'closed';
		}

		if(panel_state === 'saved') {
			if( panel_refreshed == false ) {
				element.remove();
				fn.renderMessage();
				Refresh.action(fn.flip(count));
				panel_refreshed = true;
				if( autosync[count] === true ) {
					Sync.action(count);
				}
				setTimeout(fn.removeMessage, 4000);
			}
		}
	};

	// Render message
	fn.renderMessage = function() {
		for (var i = 1; i < url.length; i++) {
			$('[data-section="' + i + '"] .message-saved')[0].classList.add('active');
		}
	};

	// Remove message
	fn.removeMessage = function() {
		for (var i = 1; i < url.length; i++) {
			$('[data-section="' + i + '"] .message-saved')[0].classList.remove('active');
		}
	};

	// Flip
	fn.flip = function(key) {
		return ( key === 1 ) ? 2 : 1;
	};

	return fn;
})();