var Error = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.onError(i);
		}	
	};

	// Trigger Error Message
	fn.onError = function(count) {
		var element = $('[data-section="' + count + '"]' + ' iframe')[0].contentWindow.document.querySelector('.message-is-alert');
		if( element ) {
			element.remove();
			fn.renderMessage();
			setTimeout(fn.removeMessage, 4000);
		}
	};

	// Render message
	fn.renderMessage = function() {
		for (var i = 1; i < url.length; i++) {
			$('[data-section="' + i + '"] .message-error')[0].classList.add('active');
		}
	};

	// Remove message
	fn.removeMessage = function() {
		for (var i = 1; i < url.length; i++) {
			$('[data-section="' + i + '"] .message-error')[0].classList.remove('active');
		}
	};

	return fn;
})();