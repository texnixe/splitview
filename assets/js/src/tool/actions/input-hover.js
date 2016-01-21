var InputHover = (function () {
	var fn = {};

	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	fn.event = function(count) {
		$('[data-section="' + count + '"] .url').mouseover(function(e){
			/*if (event.keyCode == 13) {
				_section = count;
				fn.setValue();
				fn.action();
				InputClick.deleteAttribute(count);
			}*/
			var value = $('[data-section="' + count + '"] .url input')[0].value;
			$('[data-section="' + count + '"] .address')[0].innerHTML = value;
			$('[data-section="' + count + '"]')[0].setAttribute('data-address', '');
		});
		$('[data-section="' + count + '"] .url').mouseout(function(e){
			$('[data-section="' + count + '"]')[0].removeAttribute('data-address');
		});
	};

	return fn;
})();