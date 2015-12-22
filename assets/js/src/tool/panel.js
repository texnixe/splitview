var panel = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		events();
	}

	var events = function() {
		eventSync('section.panel li.sync');
	}

	// Event sync admin to site
	var eventSync = function(selector) {
		$$$( selector ).forEach( function( element ) {
			element.addEventListener('click', function(e){
				sync();
			});
		});
	}

	// Panel - Message - Hide
	fn.panelMessageHide = function() {
		var style_element = document.createElement('style');
		var node = $$$('section.panel iframe')[0].contentWindow.document.querySelector('body').appendChild(style_element);
		node.innerHTML = '.message { display: none; }';
	}

	// Remove message from site
	var messageRemove = function(element) {
		$$$('section.panel .message-saved')[0].classList.remove('active');
		$$$('section.site .message-saved')[0].classList.remove('active');
	}

	// Remove error message from site
	var messageRemoveError = function(element) {
		$$$('section.panel .message-error')[0].classList.remove('active');
		$$$('section.site .message-error')[0].classList.remove('active');
	}

	// Remove last from url
	var removeLast = function(needle, haystack) {
		str = haystack.slice(-needle.length);
		if( str === needle) {
			haystack = haystack.slice(0, -needle.length);
		}
		return haystack;
	}

	// Trigger Error Message
	fn.triggerErrorMessage = function() {
		var element = $$$('section.panel iframe')[0].contentWindow.document.querySelector('.message-is-alert');
		if( element ) {
			element.remove();
			$$$('section.panel .message-error')[0].classList.add('active');
			$$$('section.site .message-error')[0].classList.add('active');
			setTimeout(messageRemoveError, 4000);
		}
	}

	// Trigger Saved Message
	fn.triggerSavedMessage = function() {
		var element = $$$('section.panel iframe')[0].contentWindow.document.querySelector('.message-is-notice');
		if( element ) {
			panel_state = 'saved';
		} else {
			panel_refreshed = false;
			panel_state = 'closed';
		}

		if(panel_state === 'saved') {
			if( panel_refreshed == false ) {
				element.remove();
				$$$('section.panel .message-saved')[0].classList.add('active');
				$$$('section.site .message-saved')[0].classList.add('active');
				refresh('section.site iframe');
				panel_refreshed = true;
				setTimeout(messageRemove, 4000);
			}
		}
	}

	// Remove url parts
	var removeUrlParts = function(url) {
		url = url.split('/file/')[0];
		url = removeLast('/edit', url );
		url = removeLast('/files', url );
		url = removeLast('/subpages', url );
		return url;
	}

	// Iframe url
	var iframeUrl = function() {
		return $$$('section.panel iframe')[0].contentWindow.location.href;
	}

	// Pages url
	var pagesUrl = function() {
		return data['root_url'] + '/' + action.getOption('panel', 'panel') + '/pages';
	}

	// No pages url
	var noPagesUrl = function() {
		return iframeUrl().replace(pagesUrl(), '');
	}

	// Sync Admin to site
	var sync = function() {
		var uri = removeUrlParts( noPagesUrl() );

		site_url = data['root_url'] + uri;
		site.setUrl( site_url );
	}

	return fn;
})();