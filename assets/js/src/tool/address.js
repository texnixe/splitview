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