var splitview = (function () {
	var fn = {};
	var data = {};
	var iframe_count = 0;

	// Urls
	var root_url;
	var admin_root;
	var page_uri;
	var admin_uri;
	var admin_url;

	// Options
	var memory;
	var orientation;
	var time_refresh;
	var time_bar;
	var view;
	var visible;
	var debug;
	//Shortcut

	var setValues = function() {
		//setMode();
		root_url = getOption('root_url', baseUrl()[0]);
		page_uri = getOption('page_uri', '');
		admin_uri = page_uri;
		admin_root = getOption('admin_root', 'panel/pages/');
		admin_url = root_url + '/' + admin_root + admin_uri + '/edit';

		// From options only
		time_refresh = getOption('time_refresh', 100);
		time_bar = getOption('time_bar', 1000);
		memory = getOption('memory', true);
		debug = getOption('debug', false);

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
				addIframe('.splitview--site', root_url + '/' + page_uri );

				focusRootOnLoad('.splitview--panel iframe');
				focusRootOnLoad('.splitview--site iframe');

				if( debug === true ) {
					console.log('Options JS:');
					console.log(data);
				}

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
		document.querySelector('.splitview--panel .splitview__item--back').addEventListener('click', function(e){
			viewRoot();
		});

		// View root from site
		document.querySelector('.splitview--site .splitview__item--back').addEventListener('click', function(e){
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

		// Redirect site
		document.querySelector('.splitview__item--site a').addEventListener('click', function(e){
			redirectSite(this, e);
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

		// Sync site
		document.querySelector('.splitview--site .splitview__item--sync').addEventListener('click', function(e){
			syncSite();
		});

		// Sync panel
		document.querySelector('.splitview--panel .splitview__item--sync').addEventListener('click', function(e){
			syncAdmin();
		});

		// Close
		document.querySelector('.splitview__item--close').addEventListener('click', function(e){
			hide();
		});
	}

	var syncSite = function() {
		admin_url = root_url + '/' + admin_root + page_uri + '/edit';
		document.querySelector('.splitview--panel iframe').setAttribute('src', admin_url);
	}

	var syncAdmin = function() {
		page_url = root_url + '/' + admin_uri;
		document.querySelector('.splitview--site iframe').setAttribute('src', page_url);
	}

	// Redirect to site
	var redirectSite = function(obj, e) {
		e.preventDefault();
		url = obj.getAttribute('href');
		setLocal('visible', 'false');
		if( e.which == 1) {
			window.open(url, '_self');
		} else if( e.which == 2) {
			window.open(url, '_blank');
		}
	}

	// Orientation columns
	var orientationColumns = function() {
		document.querySelector('.splitview').classList.add('splitview--columns');
		document.querySelector('.splitview').classList.remove('splitview--rows');
		setLocal('orientation', 'columns');
	}

	// Orientation rows
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

	// Hide splitview
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
		if( getLocal(slug) !== value ) {
			if( debug === true ) {
				console.log('splitview.' + slug + ': ' + value);
			}
			localStorage.setItem('splitview.' + slug, value);
		}
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
			}
		};
	}

	// Force focus on parent
	var focusRoot = function() {
		blur('.splitview--panel iframe');
		blur('.splitview--site iframe');
		focus('.splitview');
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

	// Base url
	function baseUrl() {
		var re = new RegExp(/^.*\//);
		return re.exec(window.location.href);
	}

	// Feel when url changes
	var onSrcChange = function () {
		var panel_url = document.querySelector('.splitview--panel iframe').contentWindow.location.href;
		var site_url = document.querySelector('.splitview--site iframe').contentWindow.location.href;
		document.querySelector('.splitview__item--panel .splitview__link').setAttribute('href', panel_url);
		document.querySelector('.splitview__item--site .splitview__link').setAttribute('href', site_url);

		setAdminUri();

		var element_site = document.querySelector('.splitview--site iframe').contentWindow.document.querySelector('.splitview__data');

		if( element_site ) {
			page_uri = element_site.getAttribute('data-splitview-id');
		}

		setTimeout(onSrcChange, time_bar);
	}

	// Set admin uri for sync
	var setAdminUri = function() {
		var admin_url_full = document.querySelector('.splitview--panel iframe').contentWindow.location.href;
		var admin_url_pages = root_url + '/' + admin_root;
		var admin_uri_pages = admin_url_full.replace(admin_url_pages, '');
		var file_array = admin_uri_pages.split('/file/');

		// Add array loop
		admin_uri_page = removeLast('/edit', file_array[0] );
		admin_uri_page = removeLast('/files', admin_uri_page );
		admin_uri_page = removeLast('/subpages', admin_uri_page );

		// If is admin page
		if(admin_uri_page.indexOf(root_url) == -1) {
			admin_uri = admin_uri_page;
		}
	}

	// Remove last from url
	var removeLast = function(needle, haystack) {
		str = haystack.slice(-needle.length);
		if( str === needle) {
			haystack = haystack.slice(0, -needle.length);
		}
		return haystack;
	}

	// Feel when save message is active
	var onSaved = function () {
		var element = document.querySelector('.splitview--panel iframe').contentWindow.document.querySelector('.message-content');

		if( element ) {
			refresh();
			onSavedRestart();
		} else {
			setTimeout(onSaved, time_refresh);
		}
	}

	// Feel when save message is closed
	var onSavedRestart = function() {
		var element = document.querySelector('.splitview--panel iframe').contentWindow.document.querySelector('.message-content');

		// Message open
		if( element ) {
			setTimeout(onSavedRestart, time_refresh);
		} else {
			setTimeout(onSaved, time_refresh);
		}
	}

	return fn;
})();