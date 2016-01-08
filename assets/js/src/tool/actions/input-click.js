var InputClick = (function () {
	var fn = {};
	var _section;
	var _focus = false;

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {
		fn.eventClick(count);
		fn.eventBlur(count);
		fn.eventEscape(count);
	};

	// Event click
	fn.eventClick = function(count) {
		$$$('[data-section="' + count + '"] .input input').click(function(e){
			_section = count;
			
			fn.addAttribute();

			if( _focus == false ) {
				this[0].select();
			}

			_focus = true;
		});
	};

	// Event blur
	fn.eventBlur = function(count) {
		_section = count;
		$$$('[data-section="' + count + '"] .input input')[0].onblur = fn.setBlur;
	};

	// Set blur
	fn.setBlur = function() {
		window.getSelection().removeAllRanges();
		_focus = false;
	};

	// Event Close
	fn.eventEscape = function(count) {
		$$$('[data-section="' + count + '"] .url input').keyup(function(e){
			if (event.keyCode == 27) {
				_section = count;
				window.getSelection().removeAllRanges();
				fn.deleteAttribute(count);
			}
		});
	};

	// Add attribute
	fn.addAttribute = function() {
		$$$('[data-section="' + _section + '"]')[0].setAttribute('data-input', '');
	};

	// Delete attribute
	fn.deleteAttribute = function(section) {
		$$$('[data-section="' + section + '"]')[0].removeAttribute('data-input');
	};

	return fn;
})();