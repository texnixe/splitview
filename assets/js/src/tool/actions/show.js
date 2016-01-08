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