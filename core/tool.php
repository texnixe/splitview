<?php
class SplitviewTool {
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
		self::optionsPhpGetTransform();
		self::optionsJs();
		self::optionsOutput();

		return self::$options_output;
	}

	// Args
	public static function keys() {
		$keys = array(
			'debug',
			'memory',
			'panel',
			'page.slug',
			'admin.slug',
			'root_url',
			'view',
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
			'page.slug' => ( ! empty( get('page_slug') ) ) ? get('page_slug') : '',
			'admin.slug' => ( ! empty ( get('admin_slug') ) ) ? get('admin_slug') : site()->homePage()->uri(),
			'root_url' => u()
		);
		self::$options_php_extra = $extra;
	}

	// Options php merge
	public static function optionsPhpMerge() {
		self::$options_php = array_merge( self::$options_php, self::$options_php_extra );
	}

	// Options php get transform
	public static function optionsPhpGetTransform() {
		self::$options_php = splitviewOptions::optionsGetReplacement( self::$keys, self::$options_php );
	}

	// Options js
	public static function optionsJs() {
		self::$options_js = splitviewOptions::phpValuesToJavascriptValues( self::$options_php );
	}

	// Options output
	public static function optionsOutput() {
		self::$options_output = splitviewOptions::arrayToJavascriptOptions( self::$options_js );
	}

	// Snippet
	public static function snippet( $filename, $args = null ) {
		$path = kirby()->roots()->plugins() . DS . 'splitview' . DS . 'templates' . DS . $filename . '.php';
		return tpl::load($path, $args, true );
	}

	// Html
	public static function html() {
		$path = kirby()->roots()->plugins() . DS . 'splitview' . DS . 'templates' . DS . 'tool.php';
		return tpl::load($path, array(), true );
	}

	// JS url
	public static function js() {
		$url = u() . '/' . c::get('splitview.route', 'splitview') . '/assets/js/';
		$url .= ( c::get('splitview.debug', false) === true ) ? 'dist/tool.js?time=' . time() : 'dist/tool.min.js';
		return $url;
	}

	// CSS url
	public static function css() {
		$url = u() . '/' . c::get('splitview.route', 'splitview') . '/assets/css/tool';
		$url .= ( c::get('splitview.debug', false) === true ) ? '.css?time=' . time() : '.min.css';
		return $url;
	}

	// CSS debug
	public static function cssDebug() {
		$html = '';
		if( c::get('splitview.debug', false) === true ) {
			$html = '<style>.debug{ display: flex !important; }</style>';
		}
		return $html;
	}
}