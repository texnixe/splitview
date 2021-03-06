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