var splitView = (function () {
	var fn = {};
	var iframe_count = 0;

	// Check if top level
	var _topLevel = function () {
		if( window.self === window.top ) return true;
	};

	var addIframe = function(selector) {
		var iframe = document.createElement('iframe');
		iframe.src = document.querySelector(selector).getAttribute('data-splitbar-url');
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
		document.querySelector('.splitbar__panel iframe').blur();
		document.querySelector('.splitbar__site iframe').blur();
		document.querySelector('.splitbar__wrap').focus();
	}

	// Feel when save message is active
	var _panelMessageReady = function () {
		var element = document.querySelector('.splitbar__panel iframe').contentWindow.document.querySelector('.message-content');

		if( element ) {
			_refresh();
			_panelMessageClosed();
		} else {
			setTimeout(_panelMessageReady, 100);
		}
	}

	// Feel when save message is closed
	var _panelMessageClosed = function() {
		var element = document.querySelector('.splitbar__panel iframe').contentWindow.document.querySelector('.message-content');

		// Message open
		if( element ) {
			setTimeout(_panelMessageClosed, 100);
		} else {
			setTimeout(_panelMessageReady, 100);
		}
	}

	// Feel keydown
	var _splitviewKeydown = function() {
		document.addEventListener('keydown', function(e) {
			if (e.altKey && e.keyCode == _stringToShortcut()) {
				if( document.querySelector('.splitbar__wrap').classList.contains('splitbar--hide') ) {
					_showAll();
				} else {
					_hideAll();
				}
			}
		}); 
	}

	// Convert string to shortcut number
	var _stringToShortcut = function() {
		string = '{{shortcut}}';
		return string.toUpperCase().charCodeAt(0);
	}

	// Hide element
	var _hide = function(selector) {
		document.querySelector(selector).classList.add("splitbar--hide");
	}

	// Show element
	var _show = function(selector) {
		document.querySelector(selector).classList.remove("splitbar--hide");
	}

	// Full
	var _fullWidth = function(selector) {
		document.querySelector(selector).classList.add("splitbar--full");
	}

	// Split
	var _autoWidth = function(selector) {
		document.querySelector(selector).classList.remove("splitbar--full");
	}

	// Show all
	var _showAll = function () {
		_show('.splitbar__wrap');
		_show('.splitbar__message');
		_crop(true);
		_saveActive(true);
	}

	// Hide all
	var _hideAll = function () {
		_hide('.splitbar__wrap');
		_hide('.splitbar__message');
		_crop(false);
		localStorage.setItem('splitbar.active', false);

		_saveActive(false);
	}

	// Body overflow hidden
	var _crop = function( state ) {
		if( state === true ) document.querySelector('body').classList.add('splitbar--crop');
		else document.querySelector('body').classList.remove('splitbar--crop');
	}

	// Refresh
	var _refresh = function() {
		document.querySelector('.splitbar__site iframe').contentWindow.location.reload();
	}

	// Save active state to localstorage
	var _saveActive = function( state ) {
		localStorage.setItem('splitbar.active', state);
	}

	// EVENTS

	// Site - Refresh
	var _siteRefresh = function() {
		document.querySelector('.splitbar__menu__item--refresh').onclick = function() { 
			_refresh();
		}
	}

	// Site - Fullscreen
	var _siteFullscreen = function() {
		document.querySelector('.splitbar__menu--site .splitbar__menu__item--full').onclick = function() {
			_hide('.splitbar__menu--panel');
			_hide('.splitbar__panel');
			_hide('.splitbar__menu--site .splitbar__menu__item--full');
			_show('.splitbar__menu--site .splitbar__menu__item--columns');
			_fullWidth('.splitbar__site');
		}
	}

	// Site - Columns
	var _siteColumns = function() {
		document.querySelector('.splitbar__menu--site .splitbar__menu__item--columns').onclick = function() {
			_show('.splitbar__menu--panel');
			_show('.splitbar__panel');
			_show('.splitbar__menu--site .splitbar__menu__item--full');
			_hide('.splitbar__menu--site .splitbar__menu__item--columns');
			_autoWidth('.splitbar__site');
		}
	}

	// Panel - Fullscreen
	var _panelFullscreen = function() {
		document.querySelector('.splitbar__menu--panel .splitbar__menu__item--full').onclick = function() {
			_hide('.splitbar__menu--site');
			_hide('.splitbar__site');
			_hide('.splitbar__menu--panel .splitbar__menu__item--full');
			_show('.splitbar__menu--panel .splitbar__menu__item--columns');
			_fullWidth('.splitbar__panel');
		}
	}

	// Panel - Columns
	var _panelColumns = function() {
		document.querySelector('.splitbar__menu--panel .splitbar__menu__item--columns').onclick = function() {
			_show('.splitbar__menu--site');
			_show('.splitbar__site');
			_show('.splitbar__menu--panel .splitbar__menu__item--full');
			_hide('.splitbar__menu--panel .splitbar__menu__item--columns');
			_autoWidth('.splitbar__panel');
		}
	}

	// Splitview - Close
	var _splitviewClose = function() {
		document.querySelector('.splitbar__menu--close .splitbar__menu__item--close').onclick = function() { 
			_hideAll();
		}
	}

	// Splitview - Show if localstorage active is true
	var _splitviewPlace = function() {
		if( localStorage.getItem('splitbar.active') === "true" ) {
			_showAll();
		}
	}

	// Init Splitview
	fn.init = function () {
		document.addEventListener("DOMContentLoaded", function() {
			if( _topLevel() === true ) {
				// Splitview load
				addIframe('.splitbar__panel');
				addIframe('.splitbar__site');
				iframeReady('.splitbar__panel iframe');
				iframeReady('.splitbar__site iframe');

				_splitviewPlace();

				// Splitview events
				_splitviewKeydown();
				_splitviewClose();

				// Panel
				_panelMessageReady();

				// Site
				_siteFullscreen();
				_siteColumns();
				_siteRefresh();
				_panelFullscreen();
				_panelColumns();
			}
		});
	};
	return fn;
})();
splitView.init();