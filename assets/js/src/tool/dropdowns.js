var dropdown = (function () {
	var fn = {};
	var active = false;

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
			var button_element = el.previousSibling.previousSibling;
			button_element.addEventListener('click', function(e){
				var data_dropdown = $$$('body')[0].getAttribute('data-dropdown');
				var data_bar = $$$('body')[0].getAttribute('data-bar');

				var classes = button_element.parentNode.getAttribute('class');
				var dropdown = classes.split(" ")[0];

				if( data_dropdown ) {
					remove();
					if( data_dropdown != dropdown || data_bar != view ) {
						set(dropdown, view);
					}
				} else {
					set(dropdown, view);
				}
			});
		});
	};

	var eventRemove = function() {
		$$$('.bar .hide .button').click(function(e){
			remove();
		});
		$$$('.bar .show .button').click(function(e){
			remove();
		});
		$$$('.bar .url .button-refresh').click(function(e){
			remove();
		});
		$$$('.bar .left').click(function(e){
			remove();
		});
		$$$('.dropdown li').click(function(e){
			remove();
		});
	};

	var remove = function() {
		$$$('body')[0].removeAttribute('data-dropdown');
		$$$('body')[0].removeAttribute('data-bar');
	};

	var set = function( dropdown, view ) {
		$$$('body')[0].setAttribute('data-dropdown', dropdown );
		$$$('body')[0].setAttribute('data-bar', view );
	};

	return fn;
})();