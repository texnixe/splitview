var splitview = (function () {
	var fn = {};
	var data = {};
	var iframe_count = 0;

	// Urls
	var root_url;
	var admin_uri;
	var page_uri;
	var admin_url;

	// Options
	var memory;
	var orientation;
	var time;
	var view;
	var visible;

	var setValues = function() {
		//setMode();
		root_url = getOption('root_url', baseUrl()[0]);
		page_uri = getOption('page_uri', '');
		admin_uri = getOption('admin_uri', 'panel/pages/');
		admin_url = root_url + admin_uri + page_uri + '/edit';

		// From options only
		time = getOption('time', 100);
		memory = getOption('memory', true);

		// From options or local storage
		orientation = getValue('orientation', 'columns');
		view = getValue('view', '');
		visible = getValue('visible', false);
	}

	// Init
	fn.init = function (options) {
		document.addEventListener("DOMContentLoaded", function() {
			if( topLevel() === true ) {
				if( options ) {
					data = options;
				}
				setValues();

				addIframe('.splitview--panel', admin_url);
				addIframe('.splitview--site', root_url + '' + page_uri );

				focusRootOnLoad('.splitview--panel iframe');
				focusRootOnLoad('.splitview--site iframe');

				if( memory === true ) {
					getMemory();
				}

				events();
				onSaved();
				onSrcChange();
			}
		});
	}

	var getMemory = function() {
		// Visible
		if( visible === 'true' || visible === true ) {
			show();
		}

		// Orientation
		if( orientation === 'columns' ) {
			orientationColumns();
		} else {
			orientationRows();
		}

		// Orientation
		if( view === 'panel' ) {
			viewPanel();
		} else if(view === 'site') {
			viewSite();
		}
	}

	// Events
	var events = function() {
		// Keydown
		document.addEventListener('keydown', function(e) {
			if (e.altKey && e.keyCode == stringToShortcut()) {
				if(document.querySelector('.splitview').classList.contains('splitview--hide')) {
					show();
				} else {
					hide();
				}
			}
		});

		// View root from columns
		document.querySelector('.splitview--panel .splitview__item--columns').addEventListener('click', function(e){
			viewRoot();
		});

		// View root from site
		document.querySelector('.splitview--site .splitview__item--columns').addEventListener('click', function(e){
			viewRoot();
		});

		// View panel
		document.querySelector('.splitview--panel .splitview__item--full').addEventListener('click', function(e){
			viewPanel();
		});

		// View site
		document.querySelector('.splitview--site .splitview__item--full').addEventListener('click', function(e){
			viewSite();
		});

		// Orientation columns
		document.querySelector('.splitview--meta .splitview__item--columns').addEventListener('click', function(e){
			orientationColumns();
		});

		// Orientation rows
		document.querySelector('.splitview--meta .splitview__item--rows').addEventListener('click', function(e){
			orientationRows();
		});

		// Refresh
		document.querySelector('.splitview__item--refresh').addEventListener('click', function(e){
			refresh();
		});

		// Close
		document.querySelector('.splitview__item--close').addEventListener('click', function(e){
			hide();
		});
	}

	var orientationColumns = function() {
		document.querySelector('.splitview').classList.add('splitview--columns');
		document.querySelector('.splitview').classList.remove('splitview--rows');
		setLocal('orientation', 'columns');
	}

	var orientationRows = function() {
		document.querySelector('.splitview').classList.add('splitview--rows');
		document.querySelector('.splitview').classList.remove('splitview--columns');
		setLocal('orientation', 'rows');
	}

	// Show splitview
	var show = function() {
		document.querySelector('.splitview').classList.remove('splitview--hide');
		crop('body');
		setLocal('visible', 'true');
	}

	var hide = function() {
		document.querySelector('.splitview').classList.add('splitview--hide');
		uncrop('body');
		setLocal('visible', 'false');
	}

	// View root
	var viewRoot = function() {
		document.querySelector('.splitview').classList.remove('splitview__full--panel', 'splitview__full--site');
		setLocal('view', '');
	}

	// View panel
	var viewPanel = function() {
		document.querySelector('.splitview').classList.add('splitview__full--panel');
		setLocal('view', 'panel');
	}

	// View panel
	var viewSite = function() {
		document.querySelector('.splitview').classList.add('splitview__full--site');
		setLocal('view', 'site');
	}

	// Set localstorage variable
	var setLocal = function(slug, value) {
		return localStorage.setItem('splitview.' + slug, value);
	}

	// Get localstorage variable
	var getLocal = function(slug) {
		return localStorage.getItem('splitview.' + slug);
	}

	// Convert string to shortcut number
	var stringToShortcut = function() {
		if( data.hasOwnProperty('shortcut') ) {
			var value = data.shortcut;
		} else {
			var value = 's';
		}
		return value.toUpperCase().charCodeAt(0);
	}

	// Check if top level
	var topLevel = function () {
		if( window.self === window.top ) return true;
	};

	// Add iframe to selector
	var addIframe = function(selector, value) {
		var iframe = document.createElement('iframe');
		iframe.src = value;
		document.querySelector(selector).appendChild(iframe);
		return iframe;
	}

	// After iframes loaded - Move focus to root
	var focusRootOnLoad = function(selector) {
		iframe = document.querySelector(selector);
		iframe.onload = function() {
			iframe_count++;
			if(iframe_count == 2) {
				focusRoot();
				hideInnerIframe();
			}
		};
	}

	// Force focus on parent
	var focusRoot = function() {
		blur('.splitview--panel iframe');
		blur('.splitview--site iframe');
		focus('.splitview');
	}

	var hideInnerIframe = function() {
		document.querySelector('.splitview--site iframe').contentWindow.document.querySelector('.splitview__message').classList.add('splitview--hide');
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

	// Get value from input, or from localstorage or from default value
	var getValue = function(key, defaultValue) {
		var value = '';
		if( data.hasOwnProperty(key) ) {
			value = data[key];
		} else {
			if( getLocal(key) !== null ) {
				value = getLocal(key);
			} else {
				value = defaultValue;
			}
		}
		return value;
	}

	// Force focus
	var focus = function(selector) {
		document.querySelector(selector).focus();
	}

	// Force blur
	var blur = function(selector) {
		document.querySelector(selector).blur();
	}

	// Refresh
	var refresh = function() {
		document.querySelector('.splitview--site iframe').contentWindow.location.reload();
	}

	// Body overflow hidden
	var crop = function( selector ) {
		document.querySelector(selector).classList.add('splitview--crop');
	}
	var uncrop = function( selector ) {
		document.querySelector(selector).classList.remove('splitview--crop');
	}

	function baseUrl() {
		var re = new RegExp(/^.*\//);
		return re.exec(window.location.href);
	}

	// Feel when url changes
	var onSrcChange = function () {
		var panel_url = document.querySelector('.splitview--panel iframe').contentWindow.location.href;
		var site_url = document.querySelector('.splitview--site iframe').contentWindow.location.href;
		document.querySelector('.splitview--panel .splitview__link').setAttribute('href', panel_url);
		document.querySelector('.splitview--site .splitview__link').setAttribute('href', site_url);
		setTimeout(onSrcChange, 1000);
	}

	// Feel when save message is active
	var onSaved = function () {
		var element = document.querySelector('.splitview--panel iframe').contentWindow.document.querySelector('.message-content');

		if( element ) {
			refresh();
			onSavedRestart();
		} else {
			setTimeout(onSaved, time);
		}
	}

	// Feel when save message is closed
	var onSavedRestart = function() {
		var element = document.querySelector('.splitview--panel iframe').contentWindow.document.querySelector('.message-content');

		// Message open
		if( element ) {
			setTimeout(onSavedRestart, time);
		} else {
			setTimeout(onSaved, time);
		}
	}

	return fn;
})();