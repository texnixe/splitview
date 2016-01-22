var Zoom = (function () {
	var fn = {};

	fn.style = function(section, scale, width) {
		var nodeStyle = $('[data-section="' + section + '"]' + ' iframe')[0].contentWindow.document.querySelector('.splitview-zoom');

		if( ! nodeStyle ) {
			var style_element = document.createElement('style');
			style_element.className = 'splitview-zoom';
			var node = $('[data-section="' + section + '"]' + ' iframe')[0].contentWindow.document.querySelector('body').appendChild(style_element);
			node.innerHTML = 'html { transform: scale(' + scale + '); transform-origin: top left; width: ' + width + '%; }';
		} else {
			nodeStyle.innerHTML = 'html { transform: scale(' + scale + '); transform-origin: top left; width: ' + width + '%; }';
		}
	};

	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	fn.event = function(section) {
		$('[data-section="' + section + '"] .zoom .button').click(function(e){
			fn.focus(section);
		});

		$('[data-section="' + section + '"] .zoom-custom input').keypress(function(e){
			if (event.keyCode == 13) {
				dropdown.remove();
			}
		});

		$('[data-section="' + section + '"] .zoom-custom input').wheel(function(e){
			fn.action(section);
		});

		$('[data-section="' + section + '"] .zoom-custom input').keydown(function(e){
			fn.action(section);
		});

		$('[data-section="' + section + '"] .zoom-custom input').keyup(function(e){
			fn.action(section);
		});

		$('[data-section="' + section + '"] .zoom-custom input').click(function(e){
			fn.action(section);
		});

		$('[data-section="' + section + '"] .zoom-reset').click(function(e){
			fn.reset(section);
			fn.action(section);
			fn.focus(section);
		});

		$('[data-section="' + section + '"] .zoom-plus').click(function(e){
			fn.changePlus(section);
			fn.action(section);
			fn.focus(section);
		});

		$('[data-section="' + section + '"] .zoom-minus').click(function(e){
			fn.changeMinus(section);
			fn.action(section);
			fn.focus(section);
		});
	};

	fn.focus = function(section) {
		$('[data-section="' + section + '"] .zoom-custom input').focus();
	};

	fn.action = function(section) {
		var value = fn.currentValue(section);
		var current_value = parseFloat( fn.currentValue(section) ).toFixed(1);
		current_value = parseFloat(current_value);
		var current_percentage = fn.currentPercentage(current_value);
		var magic_number = fn.magicNumber(current_percentage);
		var flipped_percentage = fn.flippedPercentage(magic_number);

		fn.style(section, current_value, flipped_percentage);


	};

	fn.reset = function(section) {
		$('[data-section="' + section + '"] .zoom-custom input')[0].value = 1.0;
	};

	fn.currentValue = function(section) {
		return $('[data-section="' + section + '"] .zoom-custom input')[0].value;
	};

	fn.currentPercentage = function( value) {
		return value * 100;
	};

	fn.magicNumber = function(percentage) {
		return 100 / percentage;
	};

	fn.flippedPercentage = function(magic_number) {
		return 100 * magic_number;
	};

	fn.changePlus = function(section) {
		var current_value = parseFloat( fn.currentValue(section) ).toFixed(1);
		current_value = parseFloat(current_value);

		var plus = current_value + 0.1;
		var plus_value = parseFloat( plus.toFixed(1) );
		$('[data-section="' + section + '"] .zoom-custom input')[0].value = plus_value;
	};

	fn.changeMinus = function(section) {
		var current_value = parseFloat( fn.currentValue(section) ).toFixed(1);
		current_value = parseFloat(current_value);

		var minus = current_value - 0.1;
		if( minus >= 0 ) {
			var minus_value = parseFloat( minus.toFixed(1) );
			$('[data-section="' + section + '"] .zoom-custom input')[0].value = minus_value;
		}
	};

	return fn;
})();