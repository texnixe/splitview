var Width = (function () {
	var fn = {};

	// Width
	var _width = [];
	_width[0] = [];
	_width[1] = [];

	// Unit
	var _unit = [];
	_unit[0] = [];
	_unit[1] = [];

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {

		$('[data-section="' + count + '"] .screen input').click(function(e){
			fn.action(this, count);
		});

		$('[data-section="' + count + '"] .screen input').keydown(function(e){
			fn.action(this, count);
		});

		$('[data-section="' + count + '"] .screen input').keyup(function(e){
			fn.action(this, count);
		});

		$('[data-section="' + count + '"] .screen input').wheel(function(e){
			fn.action(this, count);
		});

		// Screen click
		$('[data-section="' + count + '"] .screen .button').click(function(e){
			if( ! _width[count] || _width[count].length === 0) {
				fn.setWidthByBrowser(count);
			}
			fn.renderWidth(count, _width[count], _unit[count]);

			$('[data-section="' + count + '"] .screen input').focus();
		});

		$('[data-section="' + count + '"] .screen select').change(function(e){
			fn.setUnitByInput(count);
			fn.setWidthByInput(count);
			fn.changeWidth(count);
		});

		$('[data-section="' + count + '"] .screen input').keypress(function(e){
			if (event.keyCode == 13) {
				dropdown.remove();
			}
		});

		$('[data-section="' + count + '"] [data-width="320"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
		$('[data-section="' + count + '"] [data-width="480"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
		$('[data-section="' + count + '"] [data-width="640"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
		$('[data-section="' + count + '"] [data-width="800"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
		$('[data-section="' + count + '"] [data-width="1024"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
		$('[data-section="' + count + '"] [data-width="1140"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
		$('[data-section="' + count + '"] [data-width="25"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
		$('[data-section="' + count + '"] [data-width="33"]').click(function(e){
			fn.renderInputByClick(count, this);
		});

		$('[data-section="' + count + '"] [data-width="50"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
	};

	fn.action = function(obj, section) {
		var width = obj[0].value;
		fn.setUnitByInput(section);
		fn.setWidthByInput(section);
		fn.changeWidth(section);
	};

	// Render input
	fn.renderInputByClick = function(section, obj) {
		var width = obj[0].getAttribute('data-width');
		var unit = obj[0].getAttribute('data-unit');

		_width[section] = width;
		_unit[section] = unit;

		fn.renderUnit(section, unit);
		fn.renderWidth(section, width);
		fn.changeWidth(section);

		dropdown.remove();
	};

	// Set unit by input
	fn.setUnitByInput = function(section) {
		_unit[section] = $('[data-section="' + section + '"] .screen select')[0].value;
	};

	// Set width by input
	fn.setWidthByInput = function(section) {
		_width[section] = $('[data-section="' + section + '"] .screen input')[0].value;
	};

	// Set width byb browser
	fn.setWidthByBrowser = function(section) {
		_width[section] = $('[data-section="' + section + '"]')[0].offsetWidth;
	};

	// Render unit
	fn.renderUnit = function(section, unit) {
		$('[data-section="' + section + '"] .screen select')[0].value = unit;
	};

	// Render width
	fn.renderWidth = function(section, width) {
		$('[data-section="' + section + '"] .screen input')[0].value = width;
	};

	// Change width
	fn.changeWidth = function(section) {
		$('[data-section="' + section + '"]')[0].style.flexGrow = '0';
		$('[data-section="' + fn.flip(section) + '"]')[0].style.flexGrow = '1';
		$('[data-section="' + fn.flip(section) + '"]')[0].style.width = '0';
		$('[data-section="' + section + '"]')[0].style.width = _width[section] + _unit[section];

		fn.resetActive();
		fn.renderActive(section);
	};

	// Reset width
	fn.resetWidth = function(section) {
		$('[data-section="' + section + '"]')[0].style.flexGrow = '1';
		$('[data-section="' + section + '"]')[0].style.width = 'auto';
	}

	// Render active
	fn.renderActive = function(section) {
		var pixel_sizes = $('[data-section="' + section + '"] .screen .size');
		var unit_obj = $('[data-section="' + section + '"] .screen select')[0];
		var width_obj = $('[data-section="' + section + '"] .screen input')[0];

		for(i = 0; i < pixel_sizes.length; ++i) {
			var data_unit = pixel_sizes[i].getAttribute('data-unit');
			var data_width = pixel_sizes[i].getAttribute('data-width');

			if( data_unit == unit_obj.value && data_width == width_obj.value ) {
				pixel_sizes[i].classList.add('active');
			}
		}
	};

	// Reset active
	fn.resetActive = function() {
		var sizes = $('.screen .size');
		for(i = 0; i < sizes.length; ++i) {
			sizes[i].classList.remove('active');
		}
	};

	// Flip
	fn.flip = function(key) {
		return ( key === 1 ) ? 2 : 1;
	};

	return fn;
})();