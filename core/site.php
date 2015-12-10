<?php
class SplitviewSite {
	// Html
	public static function html() {
		$path = kirby()->roots()->plugins() . DS . 'splitview' . DS . 'templates' . DS . 'site.php';
		return tpl::load($path, array(), true );
	}

	// Args in javascript
	public static function args() {
		$args = '';
		$js_args = splitviewOptions::javascript();
		if( ! empty( $js_args ) )
		foreach( $js_args as $key => $option ) {
			$args .= $key . ": " . $option . ', ';
		}
		return substr($args, 0, -2);
	}

	public static function url() {
		$url = u() . '/' . c::get('splitview.route', 'splitview') . '/assets/js/';
		$url .= ( c::get('splitview.debug', false) === true ) ? 'src/site.js?time=' . time() : 'dist/site.min.js';
		return $url;
	}
}

// Function to trigger site init
function splitview() {
	echo SplitviewSite::html();
}