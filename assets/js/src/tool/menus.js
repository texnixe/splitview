var menu = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		events();
	}

	// Events
	var events = function() {
		hide('panel');
		show('panel');
		hide('site');
		show('site');
	}

	// Hide
	var hide = function(view) {
		var selector = 'section.' + view + ' .bar li.hide';
		$$$(selector +  ' .button').click(function(e){
			var hide = $$$('body')[0].getAttribute('data-menu-' + view);
			if( hide !== "true" ) {
				$$$('body')[0].setAttribute('data-menu-' + view, true);
			}
		});
	}

	// Show
	var show = function(view) {
		var selector = 'section.' + view + ' .bar li.show';
		$$$(selector +  ' .button').click(function(e){
			console.log(selector);
			var hide = $$$('body')[0].getAttribute('data-menu-' + view);
			if( hide === "true" ) {
				$$$('body')[0].removeAttribute('data-menu-' + view);
			}
		});
	}

	return fn;
})();