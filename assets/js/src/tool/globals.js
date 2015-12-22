// Refresh
function refresh(selector) {
	$$$(selector)[0].contentWindow.location.reload();
}

// Hide
function hide(selector) {
	$$$(selector).hide();
}

// Show
function show(selector) {
	$$$(selector).show();
}

// Element exists
function elementExists(selector) {
	if( $$$(selector).length ) {
		return true;
	}
}