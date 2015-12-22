var site = (function () {
	var fn = {};

	fn.setUrl = function(url) {
		$$$('section.site iframe')[0].contentWindow.location.href = url;
	}

	return fn;
})();