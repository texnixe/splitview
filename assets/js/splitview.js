var splitview = (function () {
	var fn = {};
	var iframe_count = 0;
	var data = {};

	// Check if top level
	var topLevel = function () {
		if( window.self === window.top ) return true;
	};

	// Add iframe to selector
	var addIframe = function(selector) {
		var iframe = document.createElement('iframe');
		iframe.src = document.querySelector(selector).getAttribute('data-splitview-url');
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
			setTimeout(panelMessageReady, 100);
		}
	}

	// Feel when save message is closed
	var panelMessageClosed = function() {
		var element = document.querySelector('.splitview__panel iframe').contentWindow.document.querySelector('.message-content');

		// Message open
		if( element ) {
			setTimeout(panelMessageClosed, 100);
		} else {
			setTimeout(panelMessageReady, 100);
		}
	}

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

	// Body overflow hidden
	var crop = function( selector, state ) {
		if( state === true ) document.querySelector(selector).classList.add('splitview--crop');
		else document.querySelector(selector).classList.remove('splitview--crop');
	}

	// Refresh
	var refresh = function() {
		document.querySelector('.splitview__site iframe').contentWindow.location.reload();
	}

	// Save active state to localstorage
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
			show('.splitview__menu--panel');
			show('.splitview__panel');
			show('.splitview__menu--site .splitview__menu__item--full');
			hide('.splitview__menu--site .splitview__menu__item--columns');
			autoWidth('.splitview__site');
		}

		// Panel fullscreen
		document.querySelector('.splitview__menu--panel .splitview__menu__item--full').onclick = function() {
			fn.panelFullscreen();
		}

		// Panel columns
		document.querySelector('.splitview__menu--panel .splitview__menu__item--columns').onclick = function() {
			fn.panelColumns();
		}

		// Close
		document.querySelector('.splitview__menu--close .splitview__menu__item--close').onclick = function() { 
			hideAll();
		}
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

	// Toggle splitview depending on options and local storage
	var splitviewStateActive = function() {
		if( data.hasOwnProperty('active') ) {
			var value = data.active;
		} else {
			var value = ( getLocal('active') === 'true' ) ? true : false;
		}
		if( value === true ) {
			showAll();
		}
	}

	// Set view depending on options and local storage
	var splitviewStateView = function() {
		if( data.hasOwnProperty('view') ) {
			var value = data.view;
		} else {
			if( getLocal('view') !== null ) {
				var value = getLocal('view');
			}
		}
		if( value === 'panel' ) {
			fn.panelFullscreen();
		} else if( value === 'site' ) {
			fn.siteFullscreen();
		}
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
	}

	// Init Splitview
	fn.init = function (options) {
		document.addEventListener("DOMContentLoaded", function() {
			if( topLevel() === true ) {
				data = options;

				// Add iframes
				addIframe('.splitview__panel');
				addIframe('.splitview__site');

				// Focus on root
				focusRootOnLoad('.splitview__panel iframe');
				focusRootOnLoad('.splitview__site iframe');

				// Add layout by options
				addLayout();

				// Activate shortcut
				splitviewKeydown();

				// Run events
				events();

				// Update on save
				panelMessageReady();
			}
		});
	};
	return fn;
})();