var Free = (function () {
	var fn = {};

	// Init
	fn.init = function() {
		events();
	};

	// Events
	var events = function() {
		for (var i = 1; i < url.length; i++) {
			event(i);
		}
	};

	// Event
	var event = function(count) {
		$('[data-section="' + count + '"] .free').click(function(e){
			$('body')[0].setAttribute('data-free', '');
			fn.style();
			dropdown.remove();
		});

		$('.dfw-return').click(function(e){
			$('body')[0].removeAttribute('data-free');
			fn.removeStyle();
		});
	};

	// Radera splitview-free efteråt
	fn.style = function() {
		for (var i = 0; i < $('[data-type="panel"]' + ' iframe').length; i++) {
			var nodeStyle = $('[data-type="panel"]' + ' iframe')[i].contentWindow.document.querySelector('.splitview-free');

			if( ! nodeStyle ) {
				var style_element = document.createElement('style');
				style_element.className = 'splitview-free';
				var node = $('[data-type="panel"]' + ' iframe')[i].contentWindow.document.querySelector('body').appendChild(style_element);
				node.innerHTML = '.topbar { display: none; } .app { padding-top: 0; }';
			} else {
				nodeStyle.innerHTML = '.topbar { display: none; } .app { padding-top: 0; }';
			}
		}
	};

	fn.removeStyle = function() {
		for (var i = 0; i < $('[data-type="panel"]' + ' iframe').length; i++) {
			var nodeStyle = $('[data-type="panel"]' + ' iframe')[i].contentWindow.document.querySelector('.splitview-free');
			if( nodeStyle ) {
				nodeStyle.remove();
			}
		}
	};

	return fn;
})();