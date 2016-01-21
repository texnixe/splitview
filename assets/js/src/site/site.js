var splitviewSite = (function () {
	var fn = {};
	var data = {};
	var send = {};
	var hash = '?';

	// Init
	fn.init = function (options) {
		document.addEventListener("DOMContentLoaded", function() {
			if( topLevel() === true ) {
				data = options;
				hashDefaults();
				hashBuild();
				events();
			}
		});
	};

	// Check if top level
	var topLevel = function () {
		if( window.self === window.top ) return true;
	};

	// Hash - Defaults
	var hashDefaults = function() {
		args = [];
		args['page_slug'] = encodeURIComponent( getOption('page_slug', '') );
	}

	// Hash - Build
	var hashBuild = function() {
		for (key in args) {
			if (args.hasOwnProperty(key)) {
				hash += key + '=' + args[key] + '&';
			}
		}
		hash = hash.slice(0, - 1);
	}

	// Hash - Redirect
	var hashRedirect = function() {
		href = getOption('root_url', '') + '/' + getOption('route', 'splitview') + '/' + hash;
		window.location.href = href;
	}

	// Events
	var events = function() {
		eventShortcut();
	}

	// Event - Shortcut
	var eventShortcut = function() {
		document.addEventListener('keydown', function(e) {
			if (e.altKey && e.keyCode == stringToShortcut()) {
				hashRedirect();
			}
		});
	}

	// Convert string to shortcut number
	var stringToShortcut = function() {
		return getOption('shortcut', 's').toUpperCase().charCodeAt(0);
	}

	// Get option from JS function
	var getOption = function( key, defaultValue ) {
		var value = '';
		if( data.hasOwnProperty(key) ) {
			value = data[key];
		} else {
			value = defaultValue;
		}
		return value;
	}

	return fn;
})();