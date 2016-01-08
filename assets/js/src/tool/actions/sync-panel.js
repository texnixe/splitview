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
		_url_iframe = $$$('[data-section="' + _section_current + '"] iframe')[0].contentWindow.location.href;
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
		$$$('[data-section="' + _section_target + '"] iframe')[0].contentWindow.location.href = _site_url;
	};

	// Flip
	fn.flip = function(key) {
		return ( key === 1 ) ? 2 : 1;
	};

	return fn;
})();