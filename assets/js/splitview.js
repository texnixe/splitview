var splitView = (function () {
	var fn = {};
	var iframe_count = 0;

	// Check if top level
	var topLevel = function () {
		if( window.self === window.top ) return true;
	};

	var addIframe = function(selector) {
		var iframe = document.createElement('iframe');
		iframe.src = document.querySelector(selector).getAttribute('data-splitview-url');
		document.querySelector(selector).appendChild(iframe);
		return iframe;
	}

	// Event - iframe ready
	var iframeReady = function(selector) {
		iframe = document.querySelector(selector);
		iframe.onload = function() {
			iframe_count++;
			if(iframe_count == 2) focusParent();
		};
	}

	// Force focus on parent
	var focusParent = function() {
		document.querySelector('.splitview__panel iframe').blur();
		document.querySelector('.splitview__site iframe').blur();
		document.querySelector('.splitview__wrap').focus();
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
		string = '{{shortcut}}';
		return string.toUpperCase().charCodeAt(0);
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
		crop(true);
		saveActive(true);
	}

	// Hide all
	var hideAll = function () {
		hide('.splitview__wrap');
		hide('.splitview__message');
		crop(false);
		saveActive(false);
	}

	// Body overflow hidden
	var crop = function( state ) {
		if( state === true ) document.querySelector('body').classList.add('splitview--crop');
		else document.querySelector('body').classList.remove('splitview--crop');
	}

	// Refresh
	var refresh = function() {
		document.querySelector('.splitview__site iframe').contentWindow.location.reload();
	}

	// Save active state to localstorage
	var saveActive = function( state ) {
		localStorage.setItem('splitview.active', state);
	}

	// EVENTS

	// Site - Refresh
	var siteRefresh = function() {
		document.querySelector('.splitview__menu__item--refresh').onclick = function() { 
			refresh();
		}
	}

	// Site - Fullscreen
	var siteFullscreen = function() {
		document.querySelector('.splitview__menu--site .splitview__menu__item--full').onclick = function() {
			hide('.splitview__menu--panel');
			hide('.splitview__panel');
			hide('.splitview__menu--site .splitview__menu__item--full');
			show('.splitview__menu--site .splitview__menu__item--columns');
			fullWidth('.splitview__site');
		}
	}

	// Site - Columns
	var siteColumns = function() {
		document.querySelector('.splitview__menu--site .splitview__menu__item--columns').onclick = function() {
			show('.splitview__menu--panel');
			show('.splitview__panel');
			show('.splitview__menu--site .splitview__menu__item--full');
			hide('.splitview__menu--site .splitview__menu__item--columns');
			autoWidth('.splitview__site');
		}
	}

	// Panel - Fullscreen
	var panelFullscreen = function() {
		document.querySelector('.splitview__menu--panel .splitview__menu__item--full').onclick = function() {
			hide('.splitview__menu--site');
			hide('.splitview__site');
			hide('.splitview__menu--panel .splitview__menu__item--full');
			show('.splitview__menu--panel .splitview__menu__item--columns');
			fullWidth('.splitview__panel');
		}
	}

	// Event - PanelColumns
	var event_panelColumns = function() {
		document.querySelector('.splitview__menu--panel .splitview__menu__item--columns').onclick = function() {
			fn.panelColumns();
		}
	}

	// Splitview - Close
	var splitviewClose = function() {
		document.querySelector('.splitview__menu--close .splitview__menu__item--close').onclick = function() { 
			hideAll();
		}
	}

	// Splitview - Show if localstorage active is true
	var splitviewPlace = function() {
		if( localStorage.getItem('splitview.active') === "true" ) {
			showAll();
		}
	}

	// panelColumns - Toggle stuff
	fn.panelColumns = function() {
		show('.splitview__menu--site');
		show('.splitview__site');
		show('.splitview__menu--panel .splitview__menu__item--full');
		hide('.splitview__menu--panel .splitview__menu__item--columns');
		autoWidth('.splitview__panel');
	}

	// Init Splitview
	fn.init = function () {
		document.addEventListener("DOMContentLoaded", function() {

			if( topLevel() === true ) {
				// Splitview load
				addIframe('.splitview__panel');
				addIframe('.splitview__site');
				iframeReady('.splitview__panel iframe');
				iframeReady('.splitview__site iframe');

				splitviewPlace();

				// Splitview events
				splitviewKeydown();
				splitviewClose();

				// Panel
				panelMessageReady();

				// Site
				siteFullscreen();
				siteColumns();
				siteRefresh();
				panelFullscreen();
				event_panelColumns();
			}
		});
	};
	return fn;
})();
splitView.init();