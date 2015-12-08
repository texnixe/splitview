var splitview = (function () {
	var fn = {};
	var data = {};
	var iframe_count = 0;
	var panel_url;
	var site_url;
	var panel_state;
	var panel_refreshed = true;
	var memory = {};

	// Init
	fn.init = function (options) {
		//rewriteUrl();
		document.addEventListener("DOMContentLoaded", function() {
			setup(options);
			debugData();

			addIframe('section.panel .iframe', panel_url );
			addIframe('section.site .iframe', site_url );

			addUrl( 'section.panel .url input', panel_url );
			addUrl( 'section.site .url input', site_url );

			focusRootOnLoad('section.panel iframe');
			focusRootOnLoad('section.site iframe');

			setMemory();
			loadMemory();

			events();
		});
	}

	// Rewrite url
	var rewriteUrl = function() {
		var path = location.href.split('/');
		path.pop();
		path = path.join("/") + "/";
		history.pushState(null, null, path);
	}

	// Set memory
	var setMemory = function() {
		if( localStorage.getItem('splitview.memory') ) {
			local_memory = localStorage.getItem('splitview.memory');
			if( is_json(local_memory) ) {
				memory = JSON.parse(local_memory);
			}
		}
	}

	// Is json
	var is_json = function(string) {
		try {
			var json = JSON.parse(string);
		}
		catch(e) {
			return false;
		}
		return true;
	}

	// Memory - Load
	var loadMemory = function() {
		if( data['memory'] === "true" ) {
			setOrientation( getMemory('orientation', 'columns') );
			setView( getMemory('view', 'grid') );
		} else {
			setOrientation( getOption('orientation', 'columns') );
			setView( getOption('view', 'grid') );
		}
	}

	// Get memory
	var getMemory = function( key, defaultValue ) {
		var value = '';
		if( memory && memory.hasOwnProperty(key) ) {
			value = memory[key];
		} else {
			value = defaultValue;
		}
		return value;
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

	// Setup data
	var setup = function(options) {
		data = JSON.parse(options);

		panel_url = data['root_url'] + '/' + getOption('panel', 'panel') + '/pages/' + data['admin_slug'] + '/edit';
		site_url = data['root_url'] + '/' + data['page_slug'];
	}

	// FocusRootOnLoad
	var focusRootOnLoad = function(selector) {
		iframe = $(selector);
		iframe.onload = function() {
			iframe_count++;
			if(iframe_count == 2) {
				focusRoot();
				panelMessageHide();
				timeLoop();
			}
		};
	}

	// Panel - Message - Hide
	var panelMessageHide = function() {
		style_element = document.createElement('style');
		node = $('section.panel iframe').contentWindow.document.querySelector('body').appendChild(style_element);
		node.innerHTML = '.message { display: none; }';
	}

	// Force focus
	var focus = function(selector) {
		$(selector).focus();
	}

	// Force blur
	var blur = function(selector) {
		$(selector).blur();
	}

	// Set focus on root
	var focusRoot = function() {
		blur('section.panel iframe');
		blur('section.site iframe');
		focus('.splitview');
	}

	// Debug data
	var debugData = function() {
		if( data['debug'] === true ) {
			console.log('Options JS:');
			console.log(data);
		}
	}

	// Add url
	var addUrl = function(selector, value) {
		$(selector).value = value;
	}

	// Add iframe to selector
	var addIframe = function(selector, value) {
		var iframe = document.createElement('iframe');
		iframe.src = value;
		$(selector).appendChild(iframe);
		return iframe;
	}

	// Selector - Single
	var $ = function(selector) {
		return document.querySelector(selector);
	}

	// Selector - Multiple
	var $$ = function(selector, context) {
		context = context || document;
		var elements = context.querySelectorAll(selector);
		return Array.prototype.slice.call(elements);
	}

	// Event - View
	var eventView = function(view) {
		$$( 'li.' + view ).forEach( function( element ) {
			element.addEventListener('click', function(e){
				setView(view);
			});
		});
	}

	// Event - Orientation
	var eventOrientation = function(orientation) {
		$$( 'li.' + orientation ).forEach( function( element ) {
			element.addEventListener('click', function(e){
				setOrientation(orientation);
				setView('grid');
			});
		});
	}

	// Event - Close Toggle
	var eventCloseToggle = function() {
		$$( 'li.close-dropdown' ).forEach( function( element ) {
			element.addEventListener('click', function(e){
				setDropdown(this);
			});
		});
	}

	// Event - Refresh
	var eventRefresh = function(view) {
		$('section.' + view + ' li.refresh').addEventListener('click', function(e){
			refresh('section.' + view + ' iframe');
		});
	}

	// Event - Enter url
	var eventEnterUrl = function(view) {
		$('section.' + view + ' .url input').addEventListener("keypress", function() {
			if (event.keyCode == 13) {
				var value = $('section.' + view + ' .url input').value;
				$('section.' + view + ' iframe').setAttribute('src', value);
			}
		});
	}

	// Event - Close Action
	var eventCloseAction = function(view) {
		$$( 'li.close-' + view ).forEach( function( element ) {
			element.addEventListener('click', function(e){
				window.location.href = $('section.' + view + ' iframe').contentWindow.document.location.href;
			});
		});
	}

	// Event - Close Dropdown Outside
	var eventCloseDropdownOutside = function() {
		window.addEventListener('click', function(e){
			e = e || window.event;
			var target = e.target || e.srcElement;
			var target_class = target.getAttribute('class');

			if( target_class !== 'fa fa-sign-out' && target_class !== 'close-dropdown' ) {
				$$('li.close-dropdown ul.dropdown').forEach( function( element ) {
					element.classList.remove('active');
				});
			}
		});
	}

	// Refresh
	var refresh = function(selector) {
		$(selector).contentWindow.location.reload();
	}

	// Set - View
	var setView = function(view) {
		$('body').setAttribute('data-view', view);
		setLocal('view', view);
	}

	// Set - View
	var setOrientation = function(orientation) {
		$('body').setAttribute('data-orientation', orientation);
		setLocal('orientation', orientation);
	}

	// Set - Dropdown
	var setDropdown = function(obj) {
		obj.querySelector('.dropdown').classList.toggle('active');
	}

	// Set localstorage variable
	var setLocal = function(slug, value) {
		memory[slug] = value;
		local_memory = JSON.stringify(memory);
		localStorage.setItem('splitview.memory', local_memory );
		console.log(memory);
	}

	// Timeloop
	var timeLoop = function() {
		setUrls();
		triggerSavedMessage();
		triggerErrorMessage();

		setTimeout(timeLoop, 200);
	}

	// Trigger Error Message
	var triggerErrorMessage = function() {
		element = $('section.panel iframe').contentWindow.document.querySelector('.message-is-alert');
		if( element ) {
			element.remove();
			$('section.panel .message-error').classList.add('active');
			$('section.site .message-error').classList.add('active');
			setTimeout(messageRemoveError, 4000);
		}
	}

	// Trigger Saved Message
	var triggerSavedMessage = function() {
		element = $('section.panel iframe').contentWindow.document.querySelector('.message-is-notice');
		if( element ) {
			panel_state = 'saved';
		} else {
			panel_refreshed = false;
			panel_state = 'closed';
		}

		if(panel_state === 'saved') {
			if( panel_refreshed == false ) {
				element.remove();
				$('section.panel .message-saved').classList.add('active');
				$('section.site .message-saved').classList.add('active');
				refresh('section.site iframe');
				panel_refreshed = true;
				setTimeout(messageRemove, 4000);
			}
		}
	}

	// Set urls - Triggered by timeloop
	var setUrls = function() {
		new_site_url = $('section.site iframe').contentWindow.location.href;
		new_panel_url = $('section.panel iframe').contentWindow.location.href;

		if( site_url != new_site_url ) {
			addUrl( 'section.site .url input', new_site_url );
			site_url = new_site_url;
		}

		if( panel_url != new_panel_url ) {
			addUrl( 'section.panel .url input', new_panel_url );
			panel_url = new_panel_url;
		}
	}

	// Remove message from site
	var messageRemove = function(element) {
		$('section.panel .message-saved').classList.remove('active');
		$('section.site .message-saved').classList.remove('active');
	}

	// Remove error message from site
	var messageRemoveError = function(element) {
		$('section.panel .message-error').classList.remove('active');
		$('section.site .message-error').classList.remove('active');
	}

	// Sync site to admin
	var syncSiteToAdmin = function() {
		var iframe = document.querySelector('section.site iframe');
		var id = iframe.contentWindow.document.querySelector('.splitview-data').getAttribute('data-splitview-id');
		$('section.panel iframe').contentWindow.document.location.href = data['root_url'] + '/' + getOption('panel', 'panel') + '/pages/' + id + '/edit';
	}

	// Sync Admin to site
	var syncAdminToSite = function() {
		var admin_url_full = $('section.panel iframe').contentWindow.location.href;
		var admin_url_pages = data['root_url'] + '/' + getOption('panel', 'panel') + '/pages';
		var admin_uri_pages = admin_url_full.replace(admin_url_pages, '');
		var file_array = admin_uri_pages.split('/file/');

		admin_uri_page = removeLast('/edit', file_array[0] );
		admin_uri_page = removeLast('/files', admin_uri_page );
		admin_uri_page = removeLast('/subpages', admin_uri_page );

		if(admin_uri_page.indexOf(data['root_url']) == -1) {
			admin_uri = admin_uri_page;
		}

		new_site_url = data['root_url'] + admin_uri;

		$('section.site iframe').contentWindow.location.href = new_site_url;
	}

	// Remove last from url
	var removeLast = function(needle, haystack) {
		str = haystack.slice(-needle.length);
		if( str === needle) {
			haystack = haystack.slice(0, -needle.length);
		}
		return haystack;
	}

	// Event sync site to admin
	var eventSyncSiteToAdmin = function(selector) {
		$$( selector ).forEach( function( element ) {
			element.addEventListener('click', function(e){
				syncSiteToAdmin();
			});
		});
	}

	// Event sync admin to site
	var eventSyncAdminToSite = function(selector) {
		$$( selector ).forEach( function( element ) {
			element.addEventListener('click', function(e){
				syncAdminToSite();
			});
		});
	}

	// Events - Shared
	var eventsShared = function(view) {
		eventCloseAction(view);
		eventView(view);
		eventEnterUrl(view);
		eventRefresh(view);
	}

	// Events
	var events = function() {
		// Close
		eventCloseToggle();
		eventCloseDropdownOutside();

		eventOrientation('columns');
		eventOrientation('rows');

		eventsShared('panel');
		eventsShared('site');

		eventSyncSiteToAdmin('section.site .sync');
		eventSyncAdminToSite('section.panel .sync');
	}

	return fn;
})();