var dropdown = (function () {
	var fn = {};
	var active = false;

	fn.toggle = function(selector, key) {
		$$$(selector + ' .dropdown').forEach(function(el){
			var button_element = el.previousSibling.previousSibling;
			button_element.addEventListener('click', function(e){
				var data_dropdown = $$$('body')[0].getAttribute('data-dropdown');
				var data_bar = $$$('body')[0].getAttribute('data-bar');

				var classes = button_element.parentNode.getAttribute('class');
				var dropdown = classes.split(" ")[0];

				if( data_dropdown ) {
					fn.remove();
					if( data_dropdown != dropdown || data_bar != key ) {
						set(dropdown, key);
					}
				} else {
					set(dropdown, key);
				}
			});
		});
	};

	fn.eventRemove = function() {
		$$$('.bar .hide .button').click(function(e){
			fn.remove();
		});
		$$$('.bar .show .button').click(function(e){
			fn.remove();
		});
		$$$('.bar .url .button-refresh').click(function(e){
			fn.remove();
		});
		$$$('.bar .left').click(function(e){
			fn.remove();
		});
	};

	fn.remove = function() {
		$$$('body')[0].removeAttribute('data-dropdown');
		$$$('body')[0].removeAttribute('data-bar');
	};

	var set = function( dropdown, view ) {
		$$$('body')[0].setAttribute('data-dropdown', dropdown );
		$$$('body')[0].setAttribute('data-bar', view );
	};

	return fn;
})();

var dropdowns = (function () {
	var fn = {};

	fn.toggle = function() {
		for (var i = 1; i < url.length; i++) {
			dropdown.toggle('[data-section="' + i + '"]', i);
		}
	};

	return fn;
})();