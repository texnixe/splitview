var action = (function () {
	var fn = {};

	// Is json
	fn.is_json = function(string) {
		try {
			var json = JSON.parse(string);
		}
		catch(e) {
			return false;
		}
		return true;
	};

	// Get option from JS function
	fn.getOption = function( key, defaultValue ) {
		var value = '';
		if( data.hasOwnProperty(key) ) {
			value = data[key];
		} else {
			value = defaultValue;
		}
		return value;
	};

	// Debug data
	fn.debugData = function() {
		if( data['debug'] === true ) {
			console.log('Options JS:');
			console.log(data);
		}
	};
	
	return fn;
})();