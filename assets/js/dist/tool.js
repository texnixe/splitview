var action = (function () {
	var fn = {};

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

	// Debug data
	fn.debugData = function() {
		if( data['debug'] === true ) {
			console.log('Options JS:');
			console.log(data);
		}
	};
	
	return fn;
})();
var address = (function () {
	var fn = {};

	// Render address
	fn.render = function(selector, value) {
		$(selector + ' .url input')[0].value = value;
	};

	fn.update = function(selector, value, key) {
		var new_url = $(selector + ' iframe')[0].contentWindow.location.href;
		if( new_url != value ) {
			fn.render(selector, new_url );
			url[key] = new_url;
		}
	};

	return fn;
})();

// Iframes loops
var addresses = (function () {
	var fn = {};

	fn.render = function() {
		for (var i = 1; i < url.length; i++) {
			address.render('[data-section="' + i + '"]', url[i]);
		}
	};

	fn.update = function() {
		for (var i = 1; i < url.length; i++) {
			address.update('[data-section="' + i + '"]', url[i], i);
		}
	};

	return fn;
})()
// Hide
function hide(selector) {
	$(selector).hide();
}

// Show
function show(selector) {
	$(selector).show();
}

// Element exists
function elementExists(selector) {
	if( $(selector).length ) {
		return true;
	}
}
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
var url = [];
var panel_state;
var panel_refreshed = true;
var autosync = [];
autosync[1] = false;
autosync[2] = false;
var memory = {};

var splitview = (function () {
	var fn = {};

	// Init
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
		InputHover.init();
		Show.init();
		

		Sync.init();
		Refresh.init();
		AutoSync.init();
		Zoom.init();
		Free.init();

		view.init();
		exit.init();
		Screen.init();
		Width.init();
	};

	return fn;
})();
var AutoSync = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {
		$('[data-section="' + count + '"] .autosync').click(function(e){
			if( autosync[count] === false ) {
				$('[data-section="' + count + '"]')[0].setAttribute('data-autosync', '');
				autosync[count] = true;
			} else {
				$('[data-section="' + count + '"]')[0].removeAttribute('data-autosync');
				autosync[count] = false;
			}
			dropdown.remove();
		});
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
		for (var i = 1; i < url.length; i++) {
			event(i);
		}
	};

	// Event
	var event = function(count) {
		$('[data-section="' + count + '"] .flash .copy').click(function(e){
			_section_current = count;
			fn.setSectionTarget();
			fn.render();
			dropdown.remove();
		});
	};

	// Render
	fn.render = function() {
		var get_iframe = $('[data-section="' + _section_current + '"] iframe')[0];
		var set_iframe = $('[data-section="' + _section_target + '"] iframe')[0];
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
		$(selector + ' .dropdown').forEach(function(el){
			var button_element = el.previousSibling.previousSibling;
			button_element.addEventListener('click', function(e){
				var data_dropdown = $('body')[0].getAttribute('data-dropdown');
				var data_bar = $('body')[0].getAttribute('data-bar');

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
		$('.bar .hide .button').click(function(e){
			fn.remove();
		});
		$('.bar .show .button').click(function(e){
			fn.remove();
		});
		$('.bar .url .button-refresh').click(function(e){
			fn.remove();
		});
		$('.bar .left').click(function(e){
			fn.remove();
		});
	};

	fn.remove = function() {
		$('body')[0].removeAttribute('data-dropdown');
		$('body')[0].removeAttribute('data-bar');
	};

	var set = function( dropdown, view ) {
		$('body')[0].setAttribute('data-dropdown', dropdown );
		$('body')[0].setAttribute('data-bar', view );
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
	};

	// Trigger Error Message
	fn.onError = function(count) {
		var element = $('[data-section="' + count + '"]' + ' iframe')[0].contentWindow.document.querySelector('.message-is-alert');
		if( element ) {
			element.remove();
			fn.renderMessage();
			setTimeout(fn.removeMessage, 4000);
		}
	};

	// Render message
	fn.renderMessage = function() {
		for (var i = 1; i < url.length; i++) {
			$('[data-section="' + i + '"] .message-error')[0].classList.add('active');
		}
	};

	// Remove message
	fn.removeMessage = function() {
		for (var i = 1; i < url.length; i++) {
			$('[data-section="' + i + '"] .message-error')[0].classList.remove('active');
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
		$('[data-section="' + key + '"] li.exit').click(function(e){
			var new_url = $('[data-section="' + key + '"] iframe')[0].contentWindow.document.location.href;

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
		$('.bar .flip').click(function(e){
			flip();
			dropdown.remove();
		});
	};

	// Flip
	var flip = function() {
		if( $('body')[0].getAttribute('data-flip') != 'true' ) {
			$('body')[0].setAttribute('data-flip', 'true');
		} else {
			$('body')[0].setAttribute('data-flip', 'false');
		}
	};

	return fn;
})();
var Free = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		events();
	};

	// Events
	var events = function() {
		for (var i = 1; i < url.length; i++) {
			event(i);
		}
	};

	// Event
	var event = function(count) {
		$('[data-section="' + count + '"] .free').click(function(e){
			$('body')[0].setAttribute('data-free', '');
			fn.style();
			dropdown.remove();
		});

		$('.dfw-return').click(function(e){
			$('body')[0].removeAttribute('data-free');
			fn.removeStyle();
		});
	};

	// Radera splitview-free efteråt
	fn.style = function() {
		for (var i = 0; i < $('[data-type="panel"]' + ' iframe').length; i++) {
			var nodeStyle = $('[data-type="panel"]' + ' iframe')[i].contentWindow.document.querySelector('.splitview-free');

			if( ! nodeStyle ) {
				var style_element = document.createElement('style');
				style_element.className = 'splitview-free';
				var node = $('[data-type="panel"]' + ' iframe')[i].contentWindow.document.querySelector('body').appendChild(style_element);
				node.innerHTML = '.topbar { display: none; } .app { padding-top: 0; }';
			} else {
				nodeStyle.innerHTML = '.topbar { display: none; } .app { padding-top: 0; }';
			}
		}
	};

	fn.removeStyle = function() {
		for (var i = 0; i < $('[data-type="panel"]' + ' iframe').length; i++) {
			var nodeStyle = $('[data-type="panel"]' + ' iframe')[i].contentWindow.document.querySelector('.splitview-free');
			if( nodeStyle ) {
				nodeStyle.remove();
			}
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
		$(selector + ' .iframe')[0].appendChild(iframe);
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
		$('[data-section="' + count + '"] .input input').click(function(e){
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
		$('[data-section="' + count + '"] .input input')[0].onblur = fn.setBlur;
	};

	// Set blur
	fn.setBlur = function() {
		window.getSelection().removeAllRanges();
		_focus = false;
	};

	// Event Close
	fn.eventEscape = function(count) {
		$('[data-section="' + count + '"] .url input').keyup(function(e){
			if (event.keyCode == 27) {
				_section = count;
				window.getSelection().removeAllRanges();
				fn.deleteAttribute(count);
			}
		});
	};

	// Add attribute
	fn.addAttribute = function() {
		$('[data-section="' + _section + '"]')[0].setAttribute('data-input', '');
	};

	// Delete attribute
	fn.deleteAttribute = function(section) {
		$('[data-section="' + section + '"]')[0].removeAttribute('data-input');
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
		$('[data-section="' + count + '"] .url input').keypress(function(e){
			if (event.keyCode == 13) {
				_section = count;
				fn.setValue();
				fn.action();
				InputClick.deleteAttribute(count);
			}
		});
	};

	fn.setValue = function() {
		_value = $('[data-section="' + _section + '"] .url input')[0].value;
	};

	fn.action = function() {
		$('[data-section="' + _section + '"] iframe')[0].setAttribute('src', _value);
	};

	return fn;
})();
var InputHover = (function () {
	var fn = {};

	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	fn.event = function(count) {
		$('[data-section="' + count + '"] .url').mouseover(function(e){
			/*if (event.keyCode == 13) {
				_section = count;
				fn.setValue();
				fn.action();
				InputClick.deleteAttribute(count);
			}*/
			var value = $('[data-section="' + count + '"] .url input')[0].value;
			$('[data-section="' + count + '"] .address')[0].innerHTML = value;
			$('[data-section="' + count + '"]')[0].setAttribute('data-address', '');
		});
		$('[data-section="' + count + '"] .url').mouseout(function(e){
			$('[data-section="' + count + '"]')[0].removeAttribute('data-address');
		});
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
		$('[data-section="' + count + '"] .refresh').click(function(e){
			_section = count;
			fn.action(_section);
			dropdown.remove();
		});
	};

	// Refresh
	fn.action = function(section) {
		$('[data-section="' + section + '"] iframe')[0].contentWindow.location.reload();
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
		var element = $('[data-section="' + count + '"] iframe')[0].contentWindow.document.querySelector('.message-is-notice');
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
				if( autosync[count] === true ) {
					Sync.action(count);
				}
				setTimeout(fn.removeMessage, 4000);
			}
		}
	};

	// Render message
	fn.renderMessage = function() {
		for (var i = 1; i < url.length; i++) {
			$('[data-section="' + i + '"] .message-saved')[0].classList.add('active');
		}
	};

	// Remove message
	fn.removeMessage = function() {
		for (var i = 1; i < url.length; i++) {
			$('[data-section="' + i + '"] .message-saved')[0].classList.remove('active');
		}
	};

	// Flip
	fn.flip = function(key) {
		return ( key === 1 ) ? 2 : 1;
	};

	return fn;
})();
var Screen = (function () {
	var fn = {};

	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {
		$('[data-section="' + count + '"] .screen .button').click(function(e){
			if( $('[data-dropdown="screen"]') ) {
				var width = $('[data-section="' + count + '"]')[0].offsetWidth;
				$('[data-section="' + count + '"] .screen input')[0].value = width;
			}
		});
	};

	return fn;
})();
var setup = (function () {
	var fn = {};

	// Init
	fn.init = function(options) {
		data = options;
		fn.urls();
		fn.memory();
	};

	fn.urls = function() {
		var admin_slug = ( data['page_slug'] != '' ? data['page_slug'] : 'home' );
		url[1] = data['root_url'] + '/' + action.getOption('panel', 'panel') + '/pages/' + admin_slug + '/edit';
		url[2] = data['root_url'] + '/' + data['page_slug'];
	};

	fn.memory = function() {
		if( ! data.hasOwnProperty('memory') ) {
			data.memory = true;
		}
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
		$('[data-section="' + section + '"] .show .button').click(function(e){
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
	};

	// Set url iframe
	fn.setUrlIframe = function() {
		_url_iframe = $('[data-section="' + _section_current + '"] iframe')[0].contentWindow.location.href;
	};

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
		$('[data-section="' + _section_target + '"] iframe')[0].contentWindow.location.href = _site_url;
	};

	// Flip
	fn.flip = function(key) {
		return ( key === 1 ) ? 2 : 1;
	};

	return fn;
})();
var SiteSync = (function() {
	var fn = {};
	var TYPE = '';
	var SECTION_CURRENT;
	var SECTION_TARGET;
	var SECTION_TARGET_URL;
	var _page_slug;
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
			var obj = $('[data-section="' + SECTION_TARGET + '"] iframe')[0];

			obj.contentWindow.document.location.href = SECTION_TARGET_URL;
		}
	};

	var targetUrl = function() {
		SECTION_TARGET_URL = data['root_url'] + '/' + action.getOption('panel', 'panel') + '/pages/' + _page_slug + '/edit';
	}

	var setId = function() {
		_page_slug = DATA.getAttribute('data-splitview-id');
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

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {
		$('[data-section="' + count + '"] .sync').click(function(e){
			fn.action(count);
			dropdown.remove();
		});
	};

	// Action
	fn.action = function(section) {
		var types = fn.setTypes();
		fn.cases(section, types);
	};

	// Set types
	fn.setTypes = function() {
		var types = [];
		types[1] = $('[data-section="1"][data-type]')[0].getAttribute('data-type');
		types[2] = $('[data-section="2"][data-type]')[0].getAttribute('data-type');
		return types;
	};

	// Cases
	fn.cases = function(section, types) {
		if( types[section] === 'panel' ) {
			SyncPanel.action(types[section], section);
		} else if( types[section] === 'site' ) {
			SiteSync.action(types[section], section);
		}
	};

	return fn;
})();
var view = (function () {
	var fn = {};

	fn.init = function() {
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
		$('.dropdown li.' + view).click(function(e){
			fn.setView(view);
			Width.resetWidth(1);
			Width.resetWidth(2);
			dropdown.remove();
		});
	};

	// Set - View
	fn.setView = function(view) {
		$('body')[0].setAttribute('data-view', view);
		mem.setLocal('view', view);
	};

	return fn;
})();
var Width = (function () {
	var fn = {};

	// Width
	var _width = [];
	_width[0] = [];
	_width[1] = [];

	// Unit
	var _unit = [];
	_unit[0] = [];
	_unit[1] = [];

	// Init
	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	// Event
	fn.event = function(count) {

		$('[data-section="' + count + '"] .screen input').click(function(e){
			fn.action(this, count);
		});

		$('[data-section="' + count + '"] .screen input').keydown(function(e){
			fn.action(this, count);
		});

		$('[data-section="' + count + '"] .screen input').keyup(function(e){
			fn.action(this, count);
		});

		$('[data-section="' + count + '"] .screen input').wheel(function(e){
			fn.action(this, count);
		});

		// Screen click
		$('[data-section="' + count + '"] .screen .button').click(function(e){
			if( ! _width[count] || _width[count].length === 0) {
				fn.setWidthByBrowser(count);
			}
			fn.renderWidth(count, _width[count], _unit[count]);

			$('[data-section="' + count + '"] .screen input').focus();
		});

		$('[data-section="' + count + '"] .screen select').change(function(e){
			fn.setUnitByInput(count);
			fn.setWidthByInput(count);
			fn.changeWidth(count);
		});

		$('[data-section="' + count + '"] .screen input').keypress(function(e){
			if (event.keyCode == 13) {
				dropdown.remove();
			}
		});

		$('[data-section="' + count + '"] [data-width="320"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
		$('[data-section="' + count + '"] [data-width="480"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
		$('[data-section="' + count + '"] [data-width="640"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
		$('[data-section="' + count + '"] [data-width="800"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
		$('[data-section="' + count + '"] [data-width="1024"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
		$('[data-section="' + count + '"] [data-width="1140"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
		$('[data-section="' + count + '"] [data-width="25"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
		$('[data-section="' + count + '"] [data-width="33"]').click(function(e){
			fn.renderInputByClick(count, this);
		});

		$('[data-section="' + count + '"] [data-width="50"]').click(function(e){
			fn.renderInputByClick(count, this);
		});
	};

	fn.action = function(obj, section) {
		var width = obj[0].value;
		fn.setUnitByInput(section);
		fn.setWidthByInput(section);
		fn.changeWidth(section);
	};

	// Render input
	fn.renderInputByClick = function(section, obj) {
		var width = obj[0].getAttribute('data-width');
		var unit = obj[0].getAttribute('data-unit');

		_width[section] = width;
		_unit[section] = unit;

		fn.renderUnit(section, unit);
		fn.renderWidth(section, width);
		fn.changeWidth(section);

		dropdown.remove();
	};

	// Set unit by input
	fn.setUnitByInput = function(section) {
		_unit[section] = $('[data-section="' + section + '"] .screen select')[0].value;
	};

	// Set width by input
	fn.setWidthByInput = function(section) {
		_width[section] = $('[data-section="' + section + '"] .screen input')[0].value;
	};

	// Set width byb browser
	fn.setWidthByBrowser = function(section) {
		_width[section] = $('[data-section="' + section + '"]')[0].offsetWidth;
	};

	// Render unit
	fn.renderUnit = function(section, unit) {
		$('[data-section="' + section + '"] .screen select')[0].value = unit;
	};

	// Render width
	fn.renderWidth = function(section, width) {
		$('[data-section="' + section + '"] .screen input')[0].value = width;
	};

	// Change width
	fn.changeWidth = function(section) {
		$('[data-section="' + section + '"]')[0].style.flexGrow = '0';
		$('[data-section="' + fn.flip(section) + '"]')[0].style.flexGrow = '1';
		$('[data-section="' + fn.flip(section) + '"]')[0].style.width = '0';
		$('[data-section="' + section + '"]')[0].style.width = _width[section] + _unit[section];

		fn.resetActive();
		fn.renderActive(section);
	};

	// Reset width
	fn.resetWidth = function(section) {
		$('[data-section="' + section + '"]')[0].style.flexGrow = '1';
		$('[data-section="' + section + '"]')[0].style.width = 'auto';
	}

	// Render active
	fn.renderActive = function(section) {
		var pixel_sizes = $('[data-section="' + section + '"] .screen .size');
		var unit_obj = $('[data-section="' + section + '"] .screen select')[0];
		var width_obj = $('[data-section="' + section + '"] .screen input')[0];

		for(i = 0; i < pixel_sizes.length; ++i) {
			var data_unit = pixel_sizes[i].getAttribute('data-unit');
			var data_width = pixel_sizes[i].getAttribute('data-width');

			if( data_unit == unit_obj.value && data_width == width_obj.value ) {
				pixel_sizes[i].classList.add('active');
			}
		}
	};

	// Reset active
	fn.resetActive = function() {
		var sizes = $('.screen .size');
		for(i = 0; i < sizes.length; ++i) {
			sizes[i].classList.remove('active');
		}
	};

	// Flip
	fn.flip = function(key) {
		return ( key === 1 ) ? 2 : 1;
	};

	return fn;
})();
var Zoom = (function () {
	var fn = {};

	fn.style = function(section, scale, width) {
		var nodeStyle = $('[data-section="' + section + '"]' + ' iframe')[0].contentWindow.document.querySelector('.splitview-zoom');

		if( ! nodeStyle ) {
			var style_element = document.createElement('style');
			style_element.className = 'splitview-zoom';
			var node = $('[data-section="' + section + '"]' + ' iframe')[0].contentWindow.document.querySelector('body').appendChild(style_element);
			node.innerHTML = 'html { transform: scale(' + scale + '); transform-origin: top left; width: ' + width + '%; }';
		} else {
			nodeStyle.innerHTML = 'html { transform: scale(' + scale + '); transform-origin: top left; width: ' + width + '%; }';
		}
	};

	fn.init = function() {
		for (var i = 1; i < url.length; i++) {
			fn.event(i);
		}
	};

	fn.event = function(section) {
		$('[data-section="' + section + '"] .zoom .button').click(function(e){
			fn.focus(section);
		});

		$('[data-section="' + section + '"] .zoom-custom input').keypress(function(e){
			if (event.keyCode == 13) {
				dropdown.remove();
			}
		});

		$('[data-section="' + section + '"] .zoom-custom input').wheel(function(e){
			fn.action(section);
		});

		$('[data-section="' + section + '"] .zoom-custom input').keydown(function(e){
			fn.action(section);
		});

		$('[data-section="' + section + '"] .zoom-custom input').keyup(function(e){
			fn.action(section);
		});

		$('[data-section="' + section + '"] .zoom-custom input').click(function(e){
			fn.action(section);
		});

		$('[data-section="' + section + '"] .zoom-reset').click(function(e){
			fn.reset(section);
			fn.action(section);
			fn.focus(section);
		});

		$('[data-section="' + section + '"] .zoom-plus').click(function(e){
			fn.changePlus(section);
			fn.action(section);
			fn.focus(section);
		});

		$('[data-section="' + section + '"] .zoom-minus').click(function(e){
			fn.changeMinus(section);
			fn.action(section);
			fn.focus(section);
		});
	};

	fn.focus = function(section) {
		$('[data-section="' + section + '"] .zoom-custom input').focus();
	};

	fn.action = function(section) {
		var value = fn.currentValue(section);
		var current_value = parseFloat( fn.currentValue(section) ).toFixed(1);
		current_value = parseFloat(current_value);
		var current_percentage = fn.currentPercentage(current_value);
		var magic_number = fn.magicNumber(current_percentage);
		var flipped_percentage = fn.flippedPercentage(magic_number);

		fn.style(section, current_value, flipped_percentage);


	};

	fn.reset = function(section) {
		$('[data-section="' + section + '"] .zoom-custom input')[0].value = 1.0;
	};

	fn.currentValue = function(section) {
		return $('[data-section="' + section + '"] .zoom-custom input')[0].value;
	};

	fn.currentPercentage = function( value) {
		return value * 100;
	};

	fn.magicNumber = function(percentage) {
		return 100 / percentage;
	};

	fn.flippedPercentage = function(magic_number) {
		return 100 * magic_number;
	};

	fn.changePlus = function(section) {
		var current_value = parseFloat( fn.currentValue(section) ).toFixed(1);
		current_value = parseFloat(current_value);

		var plus = current_value + 0.1;
		var plus_value = parseFloat( plus.toFixed(1) );
		$('[data-section="' + section + '"] .zoom-custom input')[0].value = plus_value;
	};

	fn.changeMinus = function(section) {
		var current_value = parseFloat( fn.currentValue(section) ).toFixed(1);
		current_value = parseFloat(current_value);

		var minus = current_value - 0.1;
		if( minus >= 0 ) {
			var minus_value = parseFloat( minus.toFixed(1) );
			$('[data-section="' + section + '"] .zoom-custom input')[0].value = minus_value;
		}
	};

	return fn;
})();
var blur = (function () {
	var fn = {};

	// Force blur
	fn.render = function(selector) {
		$(selector).blur();
	};

	return fn;
})();
var focus = (function () {
	var fn = {};

	// FocusRootOnLoad
	fn.rootOnLoad = function(selector) {
		iframe = $(selector + ' iframe')[0];
		iframe.onload = function() {
			iframe_count++;
			if(iframe_count == 2) {
				fn.root();
				messages.hide();
				timeloop.events();


				//history.pushState({}, 'Splitview', data['root_url'] + '/splitview/');
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
		$(selector).focus();
	};

	// Set focus on root
	fn.root = function() {
		blur.render('[data-section="1"] iframe');
		blur.render('[data-section="2"] iframe');
		focus.render('.splitview');
	};

	return fn;
})();
var $ = function(selector, context) {
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
	elements.change = function(cb){
		elements.forEach(function(el){
			el.addEventListener('change', function(e){
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
	elements.wheel = function(cb){
		elements.forEach(function(el){
			el.addEventListener('wheel', function(e){
				e.stopPropagation();
				cb.apply(elements,[e]);
			});
		});
	};
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
	elements.keydown = function(cb){
		elements.forEach(function(el){
			el.addEventListener('keydown', function(e){
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
		var node = $(selector + ' iframe')[0].contentWindow.document.querySelector('body').appendChild(style_element);
		node.innerHTML = '.message { display: none; }';
	};

	return fn;
})();

var messages = (function () {
	var fn = {};

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
	};

	var type = function(selector, value, key) {
		site(selector, value, key);
		panel(selector, value, key);
	};

	var site = function(selector, value, key) {
		var element = $(selector + ' iframe')[0].contentWindow.document.querySelector('.splitview-data');
		if( element ) {
			var attribute = $(selector)[0].getAttribute('data-type');
			if( attribute !== 'site') {
				$(selector)[0].setAttribute('data-type', 'site');
			}
		}
	};

	var panel = function(selector, value, key) {
		var element = $(selector + ' iframe')[0].contentWindow.document.querySelector('title');
		if( element && element.innerHTML.substr(-8) == ' | Panel' ) {
			var attribute = $(selector)[0].getAttribute('data-type');
			if( attribute !== 'panel') {
				$(selector)[0].setAttribute('data-type', 'panel');
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
	};

	return fn;
})();