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
		args['admin_slug'] = getOption('admin_slug', 'home');
		args['debug'] = getOption('debug', false);
		args['memory'] = getOption('memory', true);
		args['orientation'] = getOption('orientation', 'columns');
		args['page_slug'] = getOption('page_slug', '');
		args['panel'] = getOption('panel', 'panel');
		args['root_url'] = encodeURIComponent( getOption('root_url', '') );
		args['view'] = getOption('view', 'grid');
		//send['panel_url'] = getOption('panel_url', 'panel');

	}

	// Hash - Build
	var hashBuild = function() {
		for (key in args) {
			if (args.hasOwnProperty(key)) {
				console.log(key + " = " + args[key]);
				hash += key + '=' + args[key] + '&';
			}
		}
		hash = hash.slice(0, - 1);
	}

	// Hash - Redirect
	var hashRedirect = function() {
		href = getOption('root_url', '') + '/' + getOption('route') + '/' + hash;
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