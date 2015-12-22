var copy = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		events();
	}

	// Events
	var events = function() {
		$$$('section.panel .flash .copy').click(function(e){
			panelToSite();
		});
		$$$('section.site .flash .copy').click(function(e){
			siteToPanel();
		});
	}

	// Panel to site
	var panelToSite = function() {
		var panel = $$$('section.panel iframe')[0].contentWindow.document.location.href;
		$$$('section.site iframe')[0].contentWindow.document.location.href = panel;
	}

	// Site to panel
	var siteToPanel = function() {
		var site = $$$('section.site iframe')[0].contentWindow.document.location.href;
		$$$('section.panel iframe')[0].contentWindow.document.location.href = site;
	}
	return fn;
})();