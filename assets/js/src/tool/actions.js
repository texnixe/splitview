var action = (function () {
	var fn = {};

	// Setup data
	fn.setup = function(options) {
		data = options;

		panel_url = data['root_url'] + '/' + action.getOption('panel', 'panel') + '/pages/' + data['admin_slug'] + '/edit';
		site_url = data['root_url'] + '/' + data['page_slug'];
	};

	// Set - View
	fn.setView = function(view) {
		$$$('body')[0].setAttribute('data-view', view);
		mem.setLocal('view', view);
	};

	// Is json
	fn.is_json = function(string) {
		try {
			var json = JSON.parse(string);
		}
		catch(e) {
			return false;
		}
		return true;
	};

	// Get option from JS function
	fn.getOption = function( key, defaultValue ) {
		var value = '';
		if( data.hasOwnProperty(key) ) {
			value = data[key];
		} else {
			value = defaultValue;
		}
		return value;
	};

	// Add iframe to selector
	fn.addIframe = function(selector, value) {
		var iframe = document.createElement('iframe');
		iframe.src = value;
		$$$(selector)[0].appendChild(iframe);
		return iframe;
	};

	// Debug data
	fn.debugData = function() {
		if( data['debug'] === true ) {
			console.log('Options JS:');
			console.log(data);
		}
	};

	// TA BORT OVERLAY GREJER
	/*fn.removeNavActiveAll = function() {
		$$( 'nav li' ).forEach( function( element ) {
			element.classList.remove('active');
		});
	}
	fn.addNavActive = function(selector) {
		$$( 'nav ' + selector ).forEach( function( element ) {
			element.classList.add('active');
		});
	}
	fn.removeNavActive = function(selector) {
		$$( 'nav ' + selector ).forEach( function( element ) {
			element.classList.remove('active');
		});
	}
	fn.overlayToggle = function(element, overlay) {
		var active = element.classList.contains('active');
		action.removeNavActiveAll();
		if( ! active ) {
			action.addNavActive('li.' + overlay);
			$('body').setAttribute('data-overlay', overlay);
		} else {
			action.removeNavActive('li.' + overlay);
			$('body').removeAttribute('data-overlay');
		}
	}*/

	return fn;
})();