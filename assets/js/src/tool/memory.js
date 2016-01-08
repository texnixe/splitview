var mem = (function () {
	var fn = {};

	fn.init = function() {
		mem.setMemory();
		mem.loadMemory();
	};

	// Set localstorage variable
	fn.setLocal = function(slug, value) {
		memory[slug] = value;
		var local_memory = JSON.stringify(memory);
		localStorage.setItem('splitview.memory', local_memory );
	};

	// Set memory
	fn.setMemory = function() {
		if( localStorage.getItem('splitview.memory') ) {
			var local_memory = localStorage.getItem('splitview.memory');
			if( action.is_json(local_memory) ) {
				memory = JSON.parse(local_memory);
			}
		}
	};

	// Get memory
	fn.getMemory = function( key, defaultValue ) {
		var value = '';
		if( memory && memory.hasOwnProperty(key) ) {
			value = memory[key];
		} else {
			value = defaultValue;
		}
		return value;
	};

	// Memory - Load
	fn.loadMemory = function() {
		if( data['memory'] === true ) {
			view.setView( mem.getMemory('view', 'columns') );
		} else {
			view.setView( action.getOption('view', 'columns') );
		}
	};

	return fn;
})();