var splitview = (function () {
	var fn = {};
	var iframe_count = 0;
	var data = {};
	var active;
	var view;
	var page_uri;
	var admin_uri;
	var site_url;
	var admin_url;
	var memory;
	var time;

	//TIME
	// SAVEDREADYSTART SELECTOR + SAVEDREADYEND SELECTOR

	// Set local values
	var setValues = function() {
		//setMode();
		setActive();
		setView();
		setPageUri();
		setAdminUri();
		setSiteUrl();
		setAdminUrl();
		setMemory();
		setTime();
	}

	// Memory variables
	/*
	var setMode = function() {
		mode = getValue('mode', 'edit');
	}*/

	var setActive = function() {
		active = getValue('active', false);
	}

	var setView = function() {
		view = getValue('view', '');
	}

	// Urls
	var setPageUri = function() {
		page_uri = getOption('page_uri', '');
	}

	var setAdminUri = function() {
		admin_uri = getOption('admin_uri', '/panel/pages/');
	}

	var setSiteUrl = function() {
		site_url = getOption('site_url', '');
	}

	var setAdminUrl = function() {
		admin_url = site_url + admin_uri + page_uri + '/edit';
	}

	// Other
	var setMemory = function() {
		memory = getOption('memory', true);
	}
	var setTime = function() {
		time = getOption('time', 'fast');
		time = ( time === 'slow') ? 1000 : 100;
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

	// Add hard link
	/*
	var addLink = function(selector, url) {
		link = document.querySelector(selector);
		link.setAttribute('href', url);
	}*/

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
		blur('.splitview__panel iframe');
		blur('.splitview__site iframe');
		focus('.splitview__wrap');
	}

	// Feel when save message is active
	var panelMessageReady = function () {
		var element = document.querySelector('.splitview__panel iframe').contentWindow.document.querySelector('.message-content');

		if( element ) {
			refresh();
			panelMessageClosed();
		} else {
			setTimeout(panelMessageReady, time);
		}
	}

	// Feel when save message is closed
	var panelMessageClosed = function() {
		var element = document.querySelector('.splitview__panel iframe').contentWindow.document.querySelector('.message-content');

		// Message open
		if( element ) {
			setTimeout(panelMessageClosed, time);
		} else {
			setTimeout(panelMessageReady, time);
		}
	}

	// Feel panel url in a time loop
	/*var panelUrl = function () {
		var url = document.querySelector('.splitview__panel iframe').contentWindow.location.href;
		var slash_array = url.split("/");
		var last_element = slash_array[slash_array.length - 1];
		var third_last_element = slash_array[slash_array.length - 3];

		if( url.includes( site_url + admin_uri ) === true ) {
			if( ( last_element === 'edit' && third_last_element == 'file' ) || last_element == 'files' ) {
				mode = 'files';
			} else if( last_element === 'edit' ) {
				mode = 'edit';
			}
			setLocal('mode', mode);
		}
		setTimeout(panelUrl, 100);
	}*/

	// Feel keydown
	var splitviewKeydown = function() {
		document.addEventListener('keydown', function(e) {
			if (e.altKey && e.keyCode == stringToShortcut()) {
				if( document.querySelector('.splitview__wrap').classList.contains('splitview--hide') ) {
					showAll();
				} else {
					hideAll();
				}
			}
		}); 
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

	// Force focus
	var focus = function(selector) {
		document.querySelector(selector).focus();
	}

	// Force blur
	var blur = function(selector) {
		document.querySelector(selector).blur();
	}

	// Hide element
	var hide = function(selector) {
		document.querySelector(selector).classList.add("splitview--hide");
	}

	// Show element
	var show = function(selector) {
		document.querySelector(selector).classList.remove("splitview--hide");
	}

	// Full
	var fullWidth = function(selector) {
		document.querySelector(selector).classList.add("splitview--full");
	}

	// Split
	var autoWidth = function(selector) {
		document.querySelector(selector).classList.remove("splitview--full");
	}

	// Body overflow hidden
	var crop = function( selector, state ) {
		if( state === true ) document.querySelector(selector).classList.add('splitview--crop');
		else document.querySelector(selector).classList.remove('splitview--crop');
	}

	// Refresh
	var refresh = function() {
		document.querySelector('.splitview__site iframe').contentWindow.location.reload();
	}

	// Save active state to localstorage ENHANCE
	var saveActive = function( state ) {
		localStorage.setItem('splitview.active', state);
	}

	var events = function() {
		// Site refresh
		document.querySelector('.splitview__menu__item--refresh').onclick = function() { 
			refresh();
		}

		// Site fullscreen
		document.querySelector('.splitview__menu--site .splitview__menu__item--full').onclick = function() {
			fn.siteFullscreen();
		}

		// Site columns
		document.querySelector('.splitview__menu--site .splitview__menu__item--columns').onclick = function() {
			fn.siteColumns();
		}

		// Site hover link
		document.querySelector('.splitview__menu--site .splitview__menu__item--link').addEventListener("mouseover", function(event) {
			hoverUrl('.splitview__menu--site .splitview__menu__item--link a', '.splitview__site iframe');
		});

		// Panel fullscreen
		document.querySelector('.splitview__menu--panel .splitview__menu__item--full').onclick = function() {
			fn.panelFullscreen();
		}

		// Panel columns
		document.querySelector('.splitview__menu--panel .splitview__menu__item--columns').onclick = function() {
			fn.panelColumns();
		}

		// Panel hover link
		document.querySelector('.splitview__menu--panel .splitview__menu__item--link').addEventListener("mouseover", function(event) {
			hoverUrl('.splitview__menu--panel .splitview__menu__item--link a', '.splitview__panel iframe');
		});

		// Site click link
		document.querySelector('.splitview__menu--site .splitview__menu__item--link a').addEventListener('click', function(e){
			e.preventDefault();
			clickUrl(this);
		});

		// Close
		document.querySelector('.splitview__menu--close .splitview__menu__item--close').onclick = function() {
			hideAll();
		}
	}

	var hoverUrl = function(selector_link, selector_iframe) {
		var src = document.querySelector(selector_iframe).contentWindow.location.href;
		document.querySelector(selector_link).setAttribute('href', src);
	}

	var clickUrl = function(element) {
		hideAll();
		window.location.href = element.getAttribute('href');
	}

	// Get localstorage variable
	var getLocal = function(slug) {
		return localStorage.getItem('splitview.' + slug);
	}

	// Set localstorage variable
	var setLocal = function(slug, value) {
		return localStorage.setItem('splitview.' + slug, value);
	}

	// Add layout states
	var addLayout = function() {
		splitviewStateActive();
		splitviewStateView();
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

	// Toggle splitview depending on options and local storage
	var splitviewStateActive = function() {
		if( active === 'true' ) {
			showAll();
		}
	}

	// Set view depending on options and local storage
	var splitviewStateView = function() {
		if( view === 'panel' ) {
			fn.panelFullscreen();
		} else if( view === 'site' ) {
			fn.siteFullscreen();
		}
	}

	// Show all
	var showAll = function () {
		show('.splitview__wrap');
		show('.splitview__message');
		crop('body', true);
		saveActive(true);
	}

	// Hide all
	var hideAll = function () {
		hide('.splitview__wrap');
		hide('.splitview__message');
		crop('body', false);
		saveActive(false);
	}

	// Panel fullscreen
	fn.panelFullscreen = function() {
		hide('.splitview__menu--site');
		hide('.splitview__site');
		hide('.splitview__menu--panel .splitview__menu__item--full');
		show('.splitview__menu--panel .splitview__menu__item--columns');
		fullWidth('.splitview__panel');
		setLocal('view', 'panel');
	}

	fn.siteFullscreen = function() {
		hide('.splitview__menu--panel');
		hide('.splitview__panel');
		hide('.splitview__menu--site .splitview__menu__item--full');
		show('.splitview__menu--site .splitview__menu__item--columns');
		fullWidth('.splitview__site');
		setLocal('view', 'site');
	}

	// Panel columns
	fn.panelColumns = function() {
		show('.splitview__menu--site');
		show('.splitview__site');
		show('.splitview__menu--panel .splitview__menu__item--full');
		hide('.splitview__menu--panel .splitview__menu__item--columns');
		autoWidth('.splitview__panel');
		setLocal('view', '');
	}

	fn.siteColumns = function() {
		show('.splitview__menu--panel');
		show('.splitview__panel');
		show('.splitview__menu--site .splitview__menu__item--full');
		hide('.splitview__menu--site .splitview__menu__item--columns');
		autoWidth('.splitview__site');
		setLocal('view', '');
	}

	// Init Splitview
	fn.init = function (options) {
		document.addEventListener("DOMContentLoaded", function() {
			if( topLevel() === true ) {
				if( options ) {
					data = options;
				}

				// Set values to local scope
				setValues();

				console.log(data);

				// Add iframes
				addIframe('.splitview__panel', admin_url);
				addIframe('.splitview__site', getValue('site_url', '') + '/' + getValue('page_uri', '') );

				// Focus on root
				focusRootOnLoad('.splitview__panel iframe');
				focusRootOnLoad('.splitview__site iframe');

				// Add layout by options
				if( memory === true ) {
					addLayout();
				}

				// Activate shortcut
				splitviewKeydown();

				// Run events
				events();

				// Update on save
				panelMessageReady();

				//panelUrl();
			}
		});
	};
	return fn;
})();