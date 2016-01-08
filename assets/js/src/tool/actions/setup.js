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