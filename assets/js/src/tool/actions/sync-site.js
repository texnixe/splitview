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
			var obj = $('[data-section="' + SECTION_TARGET + '"] iframe')[0];
			obj.contentWindow.document.location.href = SECTION_TARGET_URL;
		}
	};

	var targetUrl = function() {
		SECTION_TARGET_URL = data['root_url'] + '/' + action.getOption('panel', 'panel') + '/pages/' + PAGE_SLUG + '/edit';
	}

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