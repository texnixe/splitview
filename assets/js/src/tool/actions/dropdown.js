var dropdown = (function () {
	var fn = {};
	var active = false;

<<<<<<< HEAD:assets/js/src/tool/actions/dropdown.js
	fn.toggle = function(selector, key) {
		$$$(selector + ' .dropdown').forEach(function(el){
=======
	// Init
	fn.init = function() {
		events();
	};

	// Events
	var events = function() {
		toggle('panel');
		toggle('site');
		eventRemove();
	};

	var toggle = function(view) {
		$$$('section.' + view + ' .dropdown').forEach(function(el){
>>>>>>> origin/master:assets/js/src/tool/dropdowns.js
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
<<<<<<< HEAD:assets/js/src/tool/actions/dropdown.js
=======
		$$$('.dropdown li').click(function(e){
			remove();
		});
>>>>>>> origin/master:assets/js/src/tool/dropdowns.js
	};

	fn.remove = function() {
		$$$('body')[0].removeAttribute('data-dropdown');
		$$$('body')[0].removeAttribute('data-bar');
	};

	var set = function( dropdown, view ) {
		$$$('body')[0].setAttribute('data-dropdown', dropdown );
		$$$('body')[0].setAttribute('data-bar', view );
	};
<<<<<<< HEAD:assets/js/src/tool/actions/dropdown.js

	return fn;
})();

var dropdowns = (function () {
	var fn = {};

	fn.toggle = function() {
		for (var i = 1; i < url.length; i++) {
			dropdown.toggle('[data-section="' + i + '"]', i);
		}
	};
=======
>>>>>>> origin/master:assets/js/src/tool/dropdowns.js

	return fn;
})();