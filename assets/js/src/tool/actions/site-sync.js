var SiteSync = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		events();
	}

	// Events
	var events = function() {
		eventSync('section.site li.sync');
	}

	// Event sync site to admin
	var eventSync = function(selector) {
		$$$( selector ).click(function(e){
			sync();
		});
	}

	// Sync site to admin
	var sync = function() {
		if( html_data() ) {
			var splitview_id = html_data().getAttribute('data-splitview-id');
			$$$('section.panel iframe')[0].contentWindow.document.location.href = url(splitview_id);
		}
	}

	// Url
	var url = function(splitview_id) {
		return data['root_url'] + '/' + action.getOption('panel', 'panel') + '/pages/' + splitview_id + '/edit';
	}

	// Html data
	var html_data = function() {
		var iframe = document.querySelector('section.site iframe');
		var data = iframe.contentWindow.document.querySelector('.splitview-data');
		return data;
	}

	return fn;
})();