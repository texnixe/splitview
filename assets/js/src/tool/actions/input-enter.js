var InputEnter = (function () {
	var fn = {};
	var _section;
	var _value;

	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	fn.event = function(count) {
		$('[data-section="' + count + '"] .url input').keypress(function(e){
			if (event.keyCode == 13) {
				_section = count;
				fn.setValue();
				fn.action();
				InputClick.deleteAttribute(count);
			}
		});
	};

	fn.setValue = function() {
		_value = $('[data-section="' + _section + '"] .url input')[0].value;
	};

	fn.action = function() {
		$('[data-section="' + _section + '"] iframe')[0].setAttribute('src', _value);
	};

	return fn;
})();