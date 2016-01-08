var action = (function () {
	var fn = {};

	// Setup data
	fn.setup = function(options) {
		data = options;

		panel_url = data['root_url'] + '/' + action.getOption('panel', 'panel') + '/pages/' + data['admin_slug'] + '/edit';
		site_url = data['root_url'] + '/' + data['page_slug'];
	};

	// Set - View
	fn.setView = function(view) {
		$$$('body')[0].setAttribute('data-view', view);
		mem.setLocal('view', view);
	};

	// Is json
	fn.is_json = function(string) {
		try {
			var json = JSON.parse(string);
		}
		catch(e) {
			return false;
		}
		return true;
	};

	// Get option from JS function
	fn.getOption = function( key, defaultValue ) {
		var value = '';
		if( data.hasOwnProperty(key) ) {
			value = data[key];
		} else {
			value = defaultValue;
		}
		return value;
	};

	// Add iframe to selector
	fn.addIframe = function(selector, value) {
		var iframe = document.createElement('iframe');
		iframe.src = value;
		$$$(selector)[0].appendChild(iframe);
		return iframe;
	};

	// Debug data
	fn.debugData = function() {
		if( data['debug'] === true ) {
			console.log('Options JS:');
			console.log(data);
		}
	};

	// TA BORT OVERLAY GREJER
	/*fn.removeNavActiveAll = function() {
		$$( 'nav li' ).forEach( function( element ) {
			element.classList.remove('active');
		});
	}
	fn.addNavActive = function(selector) {
		$$( 'nav ' + selector ).forEach( function( element ) {
			element.classList.add('active');
		});
	}
	fn.removeNavActive = function(selector) {
		$$( 'nav ' + selector ).forEach( function( element ) {
			element.classList.remove('active');
		});
	}
	fn.overlayToggle = function(element, overlay) {
		var active = element.classList.contains('active');
		action.removeNavActiveAll();
		if( ! active ) {
			action.addNavActive('li.' + overlay);
			$('body').setAttribute('data-overlay', overlay);
		} else {
			action.removeNavActive('li.' + overlay);
			$('body').removeAttribute('data-overlay');
		}
	}*/

	return fn;
})();
var address = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		address.setAddress( 'section.panel .url input', panel_url );
		address.setAddress( 'section.site .url input', site_url );
	};

	// Set input url
	fn.setAddress = function(selector, value) {
		$$$(selector)[0].value = value;
	};

	// Set urls - Triggered by timeloop
	fn.setAddresses = function() {
		var new_site_url = $$$('section.site iframe')[0].contentWindow.location.href;
		var new_panel_url = $$$('section.panel iframe')[0].contentWindow.location.href;

		if( site_url != new_site_url ) {
			address.setAddress( 'section.site .url input', new_site_url );
			site_url = new_site_url;
		}

		if( panel_url != new_panel_url ) {
			address.setAddress( 'section.panel .url input', new_panel_url );
			panel_url = new_panel_url;
		}
	};

	return fn;
})();
var dropdown = (function () {
	var fn = {};
	var active = false;

	// Init
	fn.init = function() {
		events();
	};

	// Events
	var events = function() {
		toggle('panel');
		toggle('site');
		eventRemove();
	};

	var toggle = function(view) {
		$$$('section.' + view + ' .dropdown').forEach(function(el){
			var button_element = el.previousSibling.previousSibling;
			button_element.addEventListener('click', function(e){
				var data_dropdown = $$$('body')[0].getAttribute('data-dropdown');
				var data_bar = $$$('body')[0].getAttribute('data-bar');

				var classes = button_element.parentNode.getAttribute('class');
				var dropdown = classes.split(" ")[0];

				if( data_dropdown ) {
					remove();
					if( data_dropdown != dropdown || data_bar != view ) {
						set(dropdown, view);
					}
				} else {
					set(dropdown, view);
				}
			});
		});
	};

	var eventRemove = function() {
		$$$('.bar .hide .button').click(function(e){
			remove();
		});
		$$$('.bar .show .button').click(function(e){
			remove();
		});
		$$$('.bar .url .button-refresh').click(function(e){
			remove();
		});
		$$$('.bar .left').click(function(e){
			remove();
		});
		$$$('.dropdown li').click(function(e){
			remove();
		});
	};

	var remove = function() {
		$$$('body')[0].removeAttribute('data-dropdown');
		$$$('body')[0].removeAttribute('data-bar');
	};

	var set = function( dropdown, view ) {
		$$$('body')[0].setAttribute('data-dropdown', dropdown );
		$$$('body')[0].setAttribute('data-bar', view );
	};

	return fn;
})();
var event = (function () {
	var fn = {};

	// Events - Shared
	fn.shared = function(view) {
		event.exit(view);
		event.view(view);
		event.enterUrl(view);
		event.refresh(view);
	};

	// Events
	fn.events = function() {
		event.shared('panel');
		event.shared('site');

		event.buttonView('panel');
		event.buttonView('site');

		event.buttonView('columns');
		event.buttonView('rows');
	};

	// Refresh
	fn.refresh = function(view) {
		$$$('section.' + view + ' .button-refresh').click(function(e){
			refresh('section.' + view + ' iframe');
		});
	};

	// View
	fn.view = function(view) {
		$$( 'li.' + view ).forEach( function( element ) {
			element.addEventListener('click', function(e){
				action.setView(view);
			});
		});
	};

	// Button view
	fn.buttonView = function(view) {
		$$$('.dropdown li.' + view).click(function(e){
			action.setView(view);
		});
	};

	// Enter url
	fn.enterUrl = function(view) {
		$$$('section.' + view + ' .url input').keypress(function(e){
			if (event.keyCode == 13) {
				var value = $$$('section.' + view + ' .url input')[0].value;
				$$$('section.' + view + ' iframe')[0].setAttribute('src', value);
			}
		});
	};

	// Exit
	fn.exit = function(view) {
		$$( 'section.' + view + ' li.exit' ).forEach( function( element ) {
			element.addEventListener('click', function(e){
				window.location.href = $$$('section.' + view + ' iframe')[0].contentWindow.document.location.href;
			});
		});
	};

	return fn;
})();
// Selector - Single
/*var $ = function(selector) {
	return document.querySelector(selector);
}*/

// Selector - Multiple
var $$ = function(selector, context) {
	context = context || document;
	var elements = context.querySelectorAll(selector);
	return Array.prototype.slice.call(elements);
};


var $$$ = function(selector, context) {
	context = context || document;
	var elements = Array.prototype.slice.call(context.querySelectorAll(selector));
	elements.click = function(cb){
		elements.forEach(function(el){
			el.addEventListener('click', function(e){
				e.stopPropagation();
				cb.apply(elements,[e]);
			});
		});
	};
	elements.keypress = function(cb){
		elements.forEach(function(el){
			el.addEventListener('keypress', function(e){
				e.stopPropagation();
				cb.apply(elements,[e]);
			});
		});
	};
	elements.show = function(cb){
		elements.forEach(function(el){
			el.classList.add('active');
		});
	};
	elements.hide = function(cb){
		elements.forEach(function(el){
			el.classList.remove('active');
		});
	};
	elements.blur = function(cb){
		elements.forEach(function(el){
			el.blur();
		});
	};
	elements.focus = function(cb){
		elements.forEach(function(el){
			el.focus();
		});
	};
	elements.toggle = function(cb){
		elements.forEach(function(el){
			el.classList.toggle('active');
		});
	};
	elements.hasClass = function(cb){
		elements.forEach(function(el){
			if( el.classList.contains(cb) ) {
				return true;
			}
		});
	};
	return elements;
};
// Refresh
function refresh(selector) {
	$$$(selector)[0].contentWindow.location.reload();
};

// Hide
function hide(selector) {
	$$$(selector).hide();
};

// Show
function show(selector) {
	$$$(selector).show();
};

// Element exists
function elementExists(selector) {
	if( $$$(selector).length ) {
		return true;
	}
};
var mem = (function () {
	var fn = {};

	fn.init = function() {
		mem.setMemory();
		mem.loadMemory();
	};

	// Set localstorage variable
	fn.setLocal = function(slug, value) {
		memory[slug] = value;
		var local_memory = JSON.stringify(memory);
		localStorage.setItem('splitview.memory', local_memory );
	};

	// Set memory
	fn.setMemory = function() {
		if( localStorage.getItem('splitview.memory') ) {
			var local_memory = localStorage.getItem('splitview.memory');
			if( action.is_json(local_memory) ) {
				memory = JSON.parse(local_memory);
			}
		}
	};

	// Get memory
	fn.getMemory = function( key, defaultValue ) {
		var value = '';
		if( memory && memory.hasOwnProperty(key) ) {
			value = memory[key];
		} else {
			value = defaultValue;
		}
		return value;
	};

	// Memory - Load
	fn.loadMemory = function() {
		if( data['memory'] === true ) {
			action.setView( mem.getMemory('view', 'columns') );
		} else {
			action.setView( action.getOption('view', 'columns') );
		}
	};

	return fn;
})();
var menu = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		events();
	};

	// Events
	var events = function() {
		hide('panel');
		show('panel');
		hide('site');
		show('site');
	};

	// Hide
	var hide = function(view) {
		var selector = 'section.' + view + ' .bar li.hide';
		$$$(selector +  ' .button').click(function(e){
			var hide = $$$('body')[0].getAttribute('data-menu-' + view);
			if( hide !== "true" ) {
				$$$('body')[0].setAttribute('data-menu-' + view, true);
			}
		});
	};

	// Show
	var show = function(view) {
		var selector = 'section.' + view + ' .bar li.show';
		$$$(selector +  ' .button').click(function(e){
			console.log(selector);
			var hide = $$$('body')[0].getAttribute('data-menu-' + view);
			if( hide === "true" ) {
				$$$('body')[0].removeAttribute('data-menu-' + view);
			}
		});
	};

	return fn;
})();
var panel = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		events();
	};

	var events = function() {
		eventSync('section.panel li.sync');
	};

	// Event sync admin to site
	var eventSync = function(selector) {
		$$$( selector ).forEach( function( element ) {
			element.addEventListener('click', function(e){
				sync();
			});
		});
	};

	// Panel - Message - Hide
	fn.panelMessageHide = function() {
		var style_element = document.createElement('style');
		var node = $$$('section.panel iframe')[0].contentWindow.document.querySelector('body').appendChild(style_element);
		node.innerHTML = '.message { display: none; }';
	};

	// Remove message from site
	var messageRemove = function(element) {
		$$$('section.panel .message-saved')[0].classList.remove('active');
		$$$('section.site .message-saved')[0].classList.remove('active');
	};

	// Remove error message from site
	var messageRemoveError = function(element) {
		$$$('section.panel .message-error')[0].classList.remove('active');
		$$$('section.site .message-error')[0].classList.remove('active');
	};

	// Remove last from url
	var removeLast = function(needle, haystack) {
		str = haystack.slice(-needle.length);
		if( str === needle) {
			haystack = haystack.slice(0, -needle.length);
		}
		return haystack;
	};

	// Trigger Error Message
	fn.triggerErrorMessage = function() {
		var element = $$$('section.panel iframe')[0].contentWindow.document.querySelector('.message-is-alert');
		if( element ) {
			element.remove();
			$$$('section.panel .message-error')[0].classList.add('active');
			$$$('section.site .message-error')[0].classList.add('active');
			setTimeout(messageRemoveError, 4000);
		}
	};

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
	};

	// Remove url parts
	var removeUrlParts = function(url) {
		url = url.split('/file/')[0];
		url = removeLast('/edit', url );
		url = removeLast('/files', url );
		url = removeLast('/subpages', url );
		return url;
	};

	// Iframe url
	var iframeUrl = function() {
		return $$$('section.panel iframe')[0].contentWindow.location.href;
	};

	// Pages url
	var pagesUrl = function() {
		return data['root_url'] + '/' + action.getOption('panel', 'panel') + '/pages';
	};

	// No pages url
	var noPagesUrl = function() {
		return iframeUrl().replace(pagesUrl(), '');
	};

	// Sync Admin to site
	var sync = function() {
		var uri = removeUrlParts( noPagesUrl() );

		site_url = data['root_url'] + uri;
		site.setUrl( site_url );
	};

	return fn;
})();
var site = (function () {
	var fn = {};

	fn.setUrl = function(url) {
		$$$('section.site iframe')[0].contentWindow.location.href = url;
	};

	return fn;
})();
var data = {};
var iframe_count = 0;
var panel_url;
var site_url;
var panel_state;
var panel_refreshed = true;
var memory = {};

var splitview = (function () {
	var fn = {};

	// Init
	fn.init = function (options) {
		panel.init();

		action.setup(options);
		action.debugData();

		action.addIframe('section.panel .iframe', panel_url );
		action.addIframe('section.site .iframe', site_url );

		menu.init();
		dropdown.init();
		address.init();
		surface.init();
		mem.init();
		copy.init();
		SiteSync.init();

		event.events();
	};

	return fn;
})();
var surface = (function () {
	var fn = {};

	fn.init = function() {
		surface.focusRootOnLoad('section.panel iframe');
		surface.focusRootOnLoad('section.site iframe');
	};

	// Force focus
	fn.focus = function(selector) {
		$$$(selector).focus();
	};

	// Force blur
	fn.blur = function(selector) {
		$$$(selector).blur();
	};

	// Set focus on root
	fn.focusRoot = function() {
		surface.blur('section.panel iframe');
		surface.blur('section.site iframe');
		surface.focus('.splitview');
	};

	// FocusRootOnLoad
	fn.focusRootOnLoad = function(selector) {
		iframe = $$$(selector)[0];
		iframe.onload = function() {
			iframe_count++;
			if(iframe_count == 2) {
				surface.focusRoot();
				panel.panelMessageHide();
				timeloop.events();
			}
		};
	};

	return fn;
})();
var timeloop = (function () {
	var fn = {};

	fn.events = function() {
		address.setAddresses();
		panel.triggerSavedMessage();
		panel.triggerErrorMessage();

		setTimeout(timeloop.events, 200);
	};

	return fn;
})();
var copy = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		events();
	};

	// Events
	var events = function() {
		$$$('section.panel .flash .copy').click(function(e){
			panelToSite();
		});
		$$$('section.site .flash .copy').click(function(e){
			siteToPanel();
		});
	};

	// Panel to site
	var panelToSite = function() {
		var panel = $$$('section.panel iframe')[0].contentWindow.document.location.href;
		$$$('section.site iframe')[0].contentWindow.document.location.href = panel;
	};

	// Site to panel
	var siteToPanel = function() {
		var site = $$$('section.site iframe')[0].contentWindow.document.location.href;
		$$$('section.panel iframe')[0].contentWindow.document.location.href = site;
	};
	return fn;
})();
var SiteSync = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		events();
	};

	// Events
	var events = function() {
		eventSync('section.site li.sync');
	};

	// Event sync site to admin
	var eventSync = function(selector) {
		$$$( selector ).click(function(e){
			sync();
		});
	};

	// Sync site to admin
	var sync = function() {
		if( html_data() ) {
			var splitview_id = html_data().getAttribute('data-splitview-id');
			$$$('section.panel iframe')[0].contentWindow.document.location.href = url(splitview_id);
		}
	};

	// Url
	var url = function(splitview_id) {
		return data['root_url'] + '/' + action.getOption('panel', 'panel') + '/pages/' + splitview_id + '/edit';
	};

	// Html data
	var html_data = function() {
		var iframe = document.querySelector('section.site iframe');
		var data = iframe.contentWindow.document.querySelector('.splitview-data');
		return data;
	};

	return fn;
})();