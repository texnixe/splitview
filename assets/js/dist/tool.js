var action = (function () {
	var fn = {};

<<<<<<< HEAD
=======
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

>>>>>>> origin/master
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
<<<<<<< HEAD
=======

	// Add iframe to selector
	fn.addIframe = function(selector, value) {
		var iframe = document.createElement('iframe');
		iframe.src = value;
		$$$(selector)[0].appendChild(iframe);
		return iframe;
	};
>>>>>>> origin/master

	// Debug data
	fn.debugData = function() {
		if( data['debug'] === true ) {
			console.log('Options JS:');
			console.log(data);
		}
	};
<<<<<<< HEAD
	
=======

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

>>>>>>> origin/master
	return fn;
})();
var address = (function () {
	var fn = {};

<<<<<<< HEAD
	// Render address
	fn.render = function(selector, value) {
		$$$(selector + ' .url input')[0].value = value;
	};
=======
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
>>>>>>> origin/master

	fn.update = function(selector, value, key) {
		var new_url = $$$(selector + ' iframe')[0].contentWindow.location.href;
		if( new_url != value ) {
			fn.render(selector, new_url );
			url[key] = new_url;
		}
	};

	return fn;
})();
<<<<<<< HEAD
=======
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
>>>>>>> origin/master

// Iframes loops
var addresses = (function () {
	var fn = {};

<<<<<<< HEAD
	fn.render = function() {
		for (var i = 1; i < url.length; i++) {
			address.render('[data-section="' + i + '"]', url[i]);
		}
=======
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
>>>>>>> origin/master
	};

	fn.update = function() {
		for (var i = 1; i < url.length; i++) {
			address.update('[data-section="' + i + '"]', url[i], i);
		}
	};
<<<<<<< HEAD
=======
	return elements;
};
// Refresh
function refresh(selector) {
	$$$(selector)[0].contentWindow.location.reload();
};
>>>>>>> origin/master

	return fn;
})()
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
			view.setView( mem.getMemory('view', 'columns') );
		} else {
			view.setView( action.getOption('view', 'columns') );
		}
	};

	return fn;
})();
var data = {};
var iframe_count = 0;
//var panel_url;
//var site_url;
var url = [];
var panel_state;
var panel_refreshed = true;
var memory = {};

var splitview = (function () {
	var fn = {};

	// Init
<<<<<<< HEAD
	fn.init = function (options) {
		setup.init(options);
		action.debugData();

		iframes.render();
		addresses.render();

		dropdowns.toggle();
		dropdown.eventRemove();
		focus.rootsOnLoad();
		mem.init();

		// Actions
		copy.init();
		flip.init();

		InputEnter.init();
		InputClick.init();
		Show.init();
		

		Sync.init();
		Refresh.init();

		view.init();
		exit.init();
=======
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
>>>>>>> origin/master
	};

	return fn;
})();
var copy = (function () {
	var fn = {};
	var _section_current;
	var _section_target;

	// Init
	fn.init = function() {
		events();
	};

	// Events
	var events = function() {
<<<<<<< HEAD
		for (var i = 1; i < url.length; i++) {
			event(i);
		}
=======
		eventSync('section.panel li.sync');
>>>>>>> origin/master
	};

	// Event
	var event = function(count) {
		$$$('[data-section="' + count + '"] .flash .copy').click(function(e){
			_section_current = count;
			fn.setSectionTarget();
			fn.render();
			dropdown.remove();
		});
	};

<<<<<<< HEAD
	// Render
	fn.render = function() {
		var get_iframe = $$$('[data-section="' + _section_current + '"] iframe')[0];
		var set_iframe = $$$('[data-section="' + _section_target + '"] iframe')[0];
		var get_url = get_iframe.contentWindow.document.location.href;
		set_iframe.contentWindow.document.location.href = get_url;
	};

	// Set section target
	fn.setSectionTarget = function() {
		_section_target = ( _section_current === 1 ) ? 2 : 1;
	};

	return fn;
})();
var dropdown = (function () {
	var fn = {};
	var active = false;

	fn.toggle = function(selector, key) {
		$$$(selector + ' .dropdown').forEach(function(el){
			var button_element = el.previousSibling.previousSibling;
			button_element.addEventListener('click', function(e){
				var data_dropdown = $$$('body')[0].getAttribute('data-dropdown');
				var data_bar = $$$('body')[0].getAttribute('data-bar');

				var classes = button_element.parentNode.getAttribute('class');
				var dropdown = classes.split(" ")[0];

				if( data_dropdown ) {
					fn.remove();
					if( data_dropdown != dropdown || data_bar != key ) {
						set(dropdown, key);
					}
				} else {
					set(dropdown, key);
				}
			});
		});
	};

	fn.eventRemove = function() {
		$$$('.bar .hide .button').click(function(e){
			fn.remove();
		});
		$$$('.bar .show .button').click(function(e){
			fn.remove();
		});
		$$$('.bar .url .button-refresh').click(function(e){
			fn.remove();
		});
		$$$('.bar .left').click(function(e){
			fn.remove();
		});
	};

	fn.remove = function() {
		$$$('body')[0].removeAttribute('data-dropdown');
		$$$('body')[0].removeAttribute('data-bar');
	};

	var set = function( dropdown, view ) {
		$$$('body')[0].setAttribute('data-dropdown', dropdown );
		$$$('body')[0].setAttribute('data-bar', view );
	};

	return fn;
})();

var dropdowns = (function () {
	var fn = {};

	fn.toggle = function() {
		for (var i = 1; i < url.length; i++) {
			dropdown.toggle('[data-section="' + i + '"]', i);
		}
	};

	return fn;
})();
var Error = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.onError(i);
		}	
=======
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
>>>>>>> origin/master
	};

	// Trigger Error Message
	fn.onError = function(count) {
		var element = $$$('[data-section="' + count + '"]' + ' iframe')[0].contentWindow.document.querySelector('.message-is-alert');
		if( element ) {
			element.remove();
			fn.renderMessage();
			setTimeout(fn.removeMessage, 4000);
		}
	};
<<<<<<< HEAD

	// Render message
	fn.renderMessage = function() {
		for (var i = 1; i < url.length; i++) {
			$$$('[data-section="' + i + '"] .message-error')[0].classList.add('active');
		}
	};

	// Remove message
	fn.removeMessage = function() {
		for (var i = 1; i < url.length; i++) {
			$$$('[data-section="' + i + '"] .message-error')[0].classList.remove('active');
		}
	};

	return fn;
})();
var exit = (function () {
	var fn = {};

	fn.init = function() {
		events();
	};

	var events = function() {
		event('1');
		event('2');
	};

	var event = function(key) {
		$$$('[data-section="' + key + '"] li.exit').click(function(e){
			var new_url = $$$('[data-section="' + key + '"] iframe')[0].contentWindow.document.location.href;

			// Middle click
			if( e.which == 2 ) {
				e.preventDefault();
				locationTab(new_url);
			} else {
				locationSelf(new_url);
			}
		});
	};

	// Location tab
	var locationTab = function(new_url) {
		var win = window.open(new_url, '_blank');
		win.focus();
	};

	// Location self
	var locationSelf = function(new_url) {
		window.location.href = new_url;
	};

	return fn;
})();
var flip = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		events();
	};

	// Events
	var events = function() {
		$$$('.bar .flip').click(function(e){
			flip();
			dropdown.remove();
		});
	};

	// Flip
	var flip = function() {
		if( $$$('body')[0].getAttribute('data-flip') != 'true' ) {
			$$$('body')[0].setAttribute('data-flip', 'true');
		} else {
			$$$('body')[0].setAttribute('data-flip', 'false');
		}
	};

	return fn;
})();
var iframe = (function () {
	var fn = {};

	// Add iframe to selector
	fn.render = function(selector, value) {
		var iframe = document.createElement('iframe');
		iframe.src = value;
		$$$(selector + ' .iframe')[0].appendChild(iframe);
		return iframe;
	};

	return fn;
})();

// Iframes loops
var iframes = (function () {
	var fn = {};

	fn.render = function() {
		for (var i = 1; i < url.length; i++) {
			iframe.render('[data-section="' + i + '"]', url[i]);
		}
	};

	return fn;
})()
var InputClick = (function () {
	var fn = {};
	var _section;
	var _focus = false;

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {
		fn.eventClick(count);
		fn.eventBlur(count);
		fn.eventEscape(count);
	};

	// Event click
	fn.eventClick = function(count) {
		$$$('[data-section="' + count + '"] .input input').click(function(e){
			_section = count;
			
			fn.addAttribute();

			if( _focus == false ) {
				this[0].select();
			}

			_focus = true;
		});
	};

	// Event blur
	fn.eventBlur = function(count) {
		_section = count;
		$$$('[data-section="' + count + '"] .input input')[0].onblur = fn.setBlur;
	};

	// Set blur
	fn.setBlur = function() {
		window.getSelection().removeAllRanges();
		_focus = false;
	};

	// Event Close
	fn.eventEscape = function(count) {
		$$$('[data-section="' + count + '"] .url input').keyup(function(e){
			if (event.keyCode == 27) {
				_section = count;
				window.getSelection().removeAllRanges();
				fn.deleteAttribute(count);
			}
		});
	};

	// Add attribute
	fn.addAttribute = function() {
		$$$('[data-section="' + _section + '"]')[0].setAttribute('data-input', '');
	};

	// Delete attribute
	fn.deleteAttribute = function(section) {
		$$$('[data-section="' + section + '"]')[0].removeAttribute('data-input');
	};

	return fn;
})();
var InputEnter = (function () {
	var fn = {};
	var _section;
	var _value;

	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	fn.event = function(count) {
		$$$('[data-section="' + count + '"] .url input').keypress(function(e){
			if (event.keyCode == 13) {
				_section = count;
				fn.setValue();
				fn.action();
				InputClick.deleteAttribute(count);
			}
		});
	};

	fn.setValue = function() {
		_value = $$$('[data-section="' + _section + '"] .url input')[0].value;
	};

	fn.action = function() {
		$$$('[data-section="' + _section + '"] iframe')[0].setAttribute('src', _value);
	};

	return fn;
})();
var Refresh = (function () {
	var fn = {};
	var _section;

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {
		$$$('[data-section="' + count + '"] .refresh').click(function(e){
			_section = count;
			fn.action(_section);
			dropdown.remove();
		});
	};
=======
>>>>>>> origin/master

	// Refresh
	fn.action = function(section) {
		$$$('[data-section="' + section + '"] iframe')[0].contentWindow.location.reload();
	};

	return fn;
})();
var Save = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {
		fn.onSave(count);
	};

	// On save
	fn.onSave = function(count) {
		var element = $$$('[data-section="' + count + '"] iframe')[0].contentWindow.document.querySelector('.message-is-notice');
		if( element ) {
			panel_state = 'saved';
		} else {
			panel_refreshed = false;
			panel_state = 'closed';
		}

		if(panel_state === 'saved') {
			if( panel_refreshed == false ) {
				element.remove();
				fn.renderMessage();
				Refresh.action(fn.flip(count));
				panel_refreshed = true;
				setTimeout(fn.removeMessage, 4000);
			}
		}
	};

<<<<<<< HEAD
	// Render message
	fn.renderMessage = function() {
		for (var i = 1; i < url.length; i++) {
			$$$('[data-section="' + i + '"] .message-saved')[0].classList.add('active');
		}
	};

	// Remove message
	fn.removeMessage = function() {
		for (var i = 1; i < url.length; i++) {
			$$$('[data-section="' + i + '"] .message-saved')[0].classList.remove('active');
		}
	};

	// Flip
	fn.flip = function(key) {
		return ( key === 1 ) ? 2 : 1;
	};

	return fn;
})();
var setup = (function () {
	var fn = {};

	// Init
	fn.init = function(options) {
		data = options;

		url[1] = data['root_url'] + '/' + action.getOption('panel', 'panel') + '/pages/' + data['admin_slug'] + '/edit';
		url[2] = data['root_url'] + '/' + data['page_slug'];
	};

	return fn;
})();
var Show = (function () {
	var fn = {};
	var _section;

	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	fn.event = function(section) {
		$$$('[data-section="' + section + '"] .show .button').click(function(e){
			InputClick.deleteAttribute(section);
		});
	};

	return fn;
})();
var SyncPanel = (function () {
	var fn = {};
	var _url_iframe;
	var _url_pages;
	var _url_no_pages;
	var _uri;
	var _section_current;
	var _section_target;
	var _type;
	var _site_url;

	// Action
	fn.action = function(type, section) {
		_type = type;
		_section_current = section;
		_section_target = fn.flip(_section_current);
		fn.sync();
	};

	// Sync
	fn.sync = function() {
		fn.setUrlIframe();
		fn.setUrlPages();
		fn.setUrlNoPages();
		fn.setUrlNoParts();
		fn.setSiteUrl();
		fn.renderUrl();
	};

	// Pages url
	fn.setUrlPages = function() {
		_url_pages = data['root_url'] + '/' + action.getOption('panel', 'panel') + '/pages';
	};

	// Set no pages
	fn.setUrlNoPages = function() {
		_url_no_pages = _url_iframe.replace(_url_pages, '');
=======
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
>>>>>>> origin/master
	};

	// Set url iframe
	fn.setUrlIframe = function() {
		_url_iframe = $$$('[data-section="' + _section_current + '"] iframe')[0].contentWindow.location.href;
	};

<<<<<<< HEAD
	// Remove url parts
	fn.setUrlNoParts = function() {
		var url_no_parts = _url_no_pages.split('/file/')[0];
		url_no_parts = fn.removeLast('/edit', url_no_parts );
		url_no_parts = fn.removeLast('/files', url_no_parts );
		url_no_parts = fn.removeLast('/subpages', url_no_parts );
		_uri = url_no_parts;
	};

	// Set site url
	fn.setSiteUrl = function() {
		_site_url = data['root_url'] + _uri;
	};

	// Remove last chars
	fn.removeLast = function(needle, haystack) {
		str = haystack.slice(-needle.length);
		if( str === needle) {
			haystack = haystack.slice(0, -needle.length);
		}
		return haystack;
	};

	// Render url
	fn.renderUrl = function() {
		$$$('[data-section="' + _section_target + '"] iframe')[0].contentWindow.location.href = _site_url;
	};

	// Flip
	fn.flip = function(key) {
		return ( key === 1 ) ? 2 : 1;
=======
		site_url = data['root_url'] + uri;
		site.setUrl( site_url );
>>>>>>> origin/master
	};

	return fn;
})();
var SiteSync = (function() {
	var fn = {};
	var TYPE = '';
	var SECTION_CURRENT;
	var SECTION_TARGET;
	var SECTION_TARGET_URL;
	var PAGE_SLUG;
	var DATA;

	fn.action = function(type, section) {
		TYPE = type;
		SECTION_CURRENT = section;
		SECTION_TARGET = flip(SECTION_CURRENT);
		DATA = fetchData();
		sync();
	};

	var sync = function() {
		if( DATA ) {
			setId();
			targetUrl();
			var obj = $$$('[data-section="' + SECTION_TARGET + '"] iframe')[0];
			obj.contentWindow.document.location.href = SECTION_TARGET_URL;
		}
	};

<<<<<<< HEAD
	var targetUrl = function() {
		SECTION_TARGET_URL = data['root_url'] + '/' + action.getOption('panel', 'panel') + '/pages/' + PAGE_SLUG + '/edit';
	}
=======
	fn.setUrl = function(url) {
		$$$('section.site iframe')[0].contentWindow.location.href = url;
	};
>>>>>>> origin/master

	var setId = function() {
		PAGE_SLUG = DATA.getAttribute('data-splitview-id');
	};

	// Flip
	var flip = function(key) {
		return ( key === 1 ) ? 2 : 1;
	};

	var fetchData = function() {
		var iframe = document.querySelector('[data-section="' + SECTION_CURRENT + '"] iframe');
		var data = iframe.contentWindow.document.querySelector('.splitview-data');
		return data;
	};

	return fn;
})();
var Sync = (function () {
	var fn = {};
	var types = {};
	var section;

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {
		$$$('[data-section="' + count + '"] .sync').click(function(e){
			section = count;
			fn.setTypes();
			fn.cases();
			dropdown.remove();
		});
	};

	// Set types
	fn.setTypes = function() {
		types[1] = $$$('[data-section="1"][data-type]')[0].getAttribute('data-type');
		types[2] = $$$('[data-section="2"][data-type]')[0].getAttribute('data-type');
	};

<<<<<<< HEAD
	// Cases
	fn.cases = function() {
		if( types[section] === 'panel' ) {
			SyncPanel.action(types[section], section);
		} else if( types[section] === 'site' ) {
			SiteSync.action(types[section], section);
		}
=======
		event.events();
>>>>>>> origin/master
	};

	return fn;
})();
var view = (function () {
	var fn = {};

	fn.init = function() {
<<<<<<< HEAD
		events();
	};

	var events = function() {
		buttonView('section1');
		buttonView('section2');
		buttonView('columns');
		buttonView('rows');
	};

	// Button view
	buttonView = function(view) {
		$$$('.dropdown li.' + view).click(function(e){
			fn.setView(view);
			dropdown.remove();
		});
	};

	// Set - View
	fn.setView = function(view) {
		$$$('body')[0].setAttribute('data-view', view);
		mem.setLocal('view', view);
	};

	return fn;
})();
var blur = (function () {
	var fn = {};
=======
		surface.focusRootOnLoad('section.panel iframe');
		surface.focusRootOnLoad('section.site iframe');
	};

	// Force focus
	fn.focus = function(selector) {
		$$$(selector).focus();
	};
>>>>>>> origin/master

	// Force blur
	fn.render = function(selector) {
		$$$(selector).blur();
	};

<<<<<<< HEAD
	return fn;
})();
var focus = (function () {
	var fn = {};
=======
	// Set focus on root
	fn.focusRoot = function() {
		surface.blur('section.panel iframe');
		surface.blur('section.site iframe');
		surface.focus('.splitview');
	};
>>>>>>> origin/master

	// FocusRootOnLoad
	fn.rootOnLoad = function(selector) {
		iframe = $$$(selector + ' iframe')[0];
		iframe.onload = function() {
			iframe_count++;
			if(iframe_count == 2) {
				fn.root();
				messages.hide();
				timeloop.events();
			}
		};
	};

	fn.rootsOnLoad = function() {
		for (var i = 1; i < url.length; i++) {
			fn.rootOnLoad('[data-section="' + i + '"]');
		}
	};

	// Force focus
	fn.render = function(selector) {
		$$$(selector).focus();
	};

<<<<<<< HEAD
	// Set focus on root
	fn.root = function() {
		blur.render('section.panel iframe');
		blur.render('section.site iframe');
		focus.render('.splitview');
=======
		setTimeout(timeloop.events, 200);
>>>>>>> origin/master
	};

	return fn;
})();
// Selector - Single
/*var $ = function(selector) {
	return document.querySelector(selector);
}*/

<<<<<<< HEAD
// Selector - Multiple
/*var $$ = function(selector, context) {
	context = context || document;
	var elements = context.querySelectorAll(selector);
	return Array.prototype.slice.call(elements);
}*/
=======
	// Init
	fn.init = function() {
		events();
	};
>>>>>>> origin/master


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
	elements.mouseover = function(cb){
		elements.forEach(function(el){
			el.addEventListener('mouseenter', function(e){
				e.stopPropagation();
				cb.apply(elements,[e]);
			});
		});
	};
<<<<<<< HEAD
	elements.mouseout = function(cb){
		elements.forEach(function(el){
			el.addEventListener('mouseleave', function(e){
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
	elements.keyup = function(cb){
		elements.forEach(function(el){
			el.addEventListener('keyup', function(e){
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
}
var message = (function () {
	var fn = {};

	fn.hide = function(selector) {
		var style_element = document.createElement('style');
		var node = $$$(selector + ' iframe')[0].contentWindow.document.querySelector('body').appendChild(style_element);
		node.innerHTML = '.message { display: none; }';
	};

=======

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
>>>>>>> origin/master
	return fn;
})();

var messages = (function () {
	var fn = {};

<<<<<<< HEAD
	fn.hide = function() {
		for (var i = 1; i < url.length; i++) {
			message.hide('[data-section="' + i + '"]');
		}
	};

	return fn;
})();
var section = (function () {
	var fn = {};

	fn.update = function() {
		for (var i = 1; i < url.length; i++) {
			type('[data-section="' + i + '"]', url[i], i);
		}
=======
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
>>>>>>> origin/master
	};

	var type = function(selector, value, key) {
		site(selector, value, key);
		panel(selector, value, key);
	};

	var site = function(selector, value, key) {
		var element = $$$(selector + ' iframe')[0].contentWindow.document.querySelector('.splitview-data');
		if( element ) {
			var attribute = $$$(selector)[0].getAttribute('data-type');
			if( attribute !== 'site') {
				$$$(selector)[0].setAttribute('data-type', 'site');
			}
		}
	};

<<<<<<< HEAD
	var panel = function(selector, value, key) {
		var element = $$$(selector + ' iframe')[0].contentWindow.document.querySelector('title');
		if( element && element.innerHTML.substr(-8) == ' | Panel' ) {
			var attribute = $$$(selector)[0].getAttribute('data-type');
			if( attribute !== 'panel') {
				$$$(selector)[0].setAttribute('data-type', 'panel');
			}
		}
	};

	return fn;
})();
var timeloop = (function () {
	var fn = {};

	fn.events = function() {
		section.update();
		addresses.update();
		Save.init();
		Error.init();

		setTimeout(fn.events, 200);
=======
	// Url
	var url = function(splitview_id) {
		return data['root_url'] + '/' + action.getOption('panel', 'panel') + '/pages/' + splitview_id + '/edit';
	};

	// Html data
	var html_data = function() {
		var iframe = document.querySelector('section.site iframe');
		var data = iframe.contentWindow.document.querySelector('.splitview-data');
		return data;
>>>>>>> origin/master
	};

	return fn;
})();