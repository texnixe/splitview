var event = (function () {
	var fn = {};

	// Events - Shared
	fn.shared = function(view) {
		event.exit(view);
		event.view(view);
		event.enterUrl(view);
		event.refresh(view);
	};

	// Events
	fn.events = function() {
		event.shared('panel');
		event.shared('site');

		event.buttonView('panel');
		event.buttonView('site');

		event.buttonView('columns');
		event.buttonView('rows');
	};

	// Refresh
	fn.refresh = function(view) {
		$$$('section.' + view + ' .button-refresh').click(function(e){
			refresh('section.' + view + ' iframe');
		});
	};

	// View
	fn.view = function(view) {
		$$( 'li.' + view ).forEach( function( element ) {
			element.addEventListener('click', function(e){
				action.setView(view);
			});
		});
	};

	// Button view
	fn.buttonView = function(view) {
		$$$('.dropdown li.' + view).click(function(e){
			action.setView(view);
		});
	};

	// Enter url
	fn.enterUrl = function(view) {
		$$$('section.' + view + ' .url input').keypress(function(e){
			if (event.keyCode == 13) {
				var value = $$$('section.' + view + ' .url input')[0].value;
				$$$('section.' + view + ' iframe')[0].setAttribute('src', value);
			}
		});
	};

	// Exit
	fn.exit = function(view) {
		$$( 'section.' + view + ' li.exit' ).forEach( function( element ) {
			element.addEventListener('click', function(e){
				window.location.href = $$$('section.' + view + ' iframe')[0].contentWindow.document.location.href;
			});
		});
	};

	return fn;
})();