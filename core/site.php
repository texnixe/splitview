<?php
class SplitviewSite {
	// Globals
	public static $keys = array();
	public static $options_php = array();
	public static $options_php_extra = array();
	public static $options_js = array();
	public static $options_output;

	// Init
	public static function init() {
		self::keys();
		self::optionsPhp();
		self::optionsPhpExtra();
		self::optionsPhpMerge();
		self::optionsJs();
		self::optionsOutput();

		return self::$options_output;
	}

	// Args
	public static function keys() {
		$keys = array(
			'shortcut',
			'route',
		);
		self::$keys = $keys;
	}

	// Options php
	public static function optionsPhp() {
		self::$options_php = splitviewOptions::options( self::$keys );
	}

	// Options php extra
	private static function optionsPhpExtra() {
		$extra = array(
			'page.slug' => ( page()->isHomePage() !== true ) ? page()->uri() : '',
			'admin.slug' => page()->uri(),
			'root_url' => u()
		);
		self::$options_php_extra = $extra;
	}

	// Options php merge
	public static function optionsPhpMerge() {
		self::$options_php = array_merge( self::$options_php, self::$options_php_extra );
	}

	// Options js
	public static function optionsJs() {
		self::$options_js = splitviewOptions::phpValuesToJavascriptValues( self::$options_php );
	}

	// Options output
	public static function optionsOutput() {
		self::$options_output = splitviewOptions::arrayToJavascriptOptions( self::$options_js );
	}

	// Html
	public static function html() {
		$path = kirby()->roots()->plugins() . DS . 'splitview' . DS . 'templates' . DS . 'site.php';
		return tpl::load($path, array(), true );
	}

	// Url
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