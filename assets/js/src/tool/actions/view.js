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
		$$$('.dropdown li.' + view).click(function(e){
			fn.setView(view);
			dropdown.remove();
		});
	};

	// Set - View
	fn.setView = function(view) {
		$$$('body')[0].setAttribute('data-view', view);
		mem.setLocal('view', view);
	};

	return fn;
})();