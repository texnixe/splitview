<?php
class splitview
{
	public static $option_keys = array(
		'memory',
		'orientation',
		'time.refresh',
		'time.bar',
		'shortcut',
		'visible',
		'view',
		'debug',
		'root_url',
		'admin_uri',
		'page_uri'
	);
	public static $options_php = array();
	public static $options_js = array();

	public static function css() {
		$html = '';
		if( c::get('splitview.css', true) === true ) {
			$html = '<link rel="stylesheet" href="' . u() . '/splitview.css?time=' . time() . '">';
		}
		return $html;
	}

	public static function js() {
		$html = '';
		if( c::get('splitview.js', true) === true ) {
			$html = '<script type="text/javascript" src="' . u() . '/splitview.js?time=' . time() . '"></script>';
		}
		return $html;
	}

	public static function replaceFonts( $html ) {
		$fonts = array(
			array('{{font-awesome}}', kirby()->urls()->index() . '/panel/assets/fonts/' . 'fontawesome-webfont.woff?v=4.2'),
			array('{{source-sans-pro-400}}', kirby()->urls()->index() . '/panel/assets/fonts/' . 'sourcesanspro-400.woff'),
		);
		foreach( $fonts as $font ) {
			$html = str_ireplace($font[0], $font[1], $html);
		}
		return $html;
	}

	public static function init() {
		static::optionsPhp();
		static::optionsJs();
		$html = static::html();
		return $html;
	}

	private static function optionsPhp() {
		foreach( self::$option_keys as $key ) {
			$value = c::get('splitview.' . $key, 'undefined');
			if( $value !== 'undefined') {
				$values[$key] = $value;
			} else {
				if( $key == 'root_url' ) {
					$values[$key] = u();
				}
				if( $key == 'admin_uri' ) {
					$values[$key] = 'panel/pages/';
				}
				if( $key == 'page_uri' ) {
					$values[$key] = page()->uri();
				}
			}
		}
		static::$options_php = $values;
	}

	private static function optionsJs() {
		foreach( static::$options_php as $key => $option ) {
			$option = ( is_string( $option ) ) ? "'" . $option . "'" : $option;
			$option = ( $option === false ) ? 'false' : $option;
			$option = ( $option === true ) ? 'true' : $option;
			$option = str_replace('alt+', '', strtolower( $option ) );
			$key = str_replace('.', '_', $key );
			static::$options_js[$key] = $option;
		}
	}

	private static function html() {
		$html = '';
		if( c::get('splitview.html', true) === true ) {
			$html = tpl::load( kirby()->roots()->plugins() . DS . 'splitview' . DS . 'templates' . DS . 'html.php', array(), true );
			$html = "\n\n<!-- Splitview # Start -->\n" . $html . "\n<!-- Splitview # End -->\n\n";
			$html = ( c::get('splitview.minify', true) === true ) ? self::minifyHtml($html) : $html;
		}
		return $html;
	}

	private static function minifyHtml($html) {
		return str_replace(array("\n", "\r", "\t"), array("", "", ""), $html);
	}

	protected function __construct() {}
	private function __clone() {}
	private function __wakeup()	{}
}

function splitview() {
	if( c::get('splitview.active', true) === true && site()->user() ) {
		return splitview::init();
	} else {
		return '';
	}
}

kirby()->routes(array(  
	array(
		'pattern' => 'splitview.css', 
		'action'  => function() {
			header("Content-type: text/css; charset: UTF-8");
			$css = tpl::load( kirby()->roots()->plugins() . DS . 'splitview' . DS . 'assets' . DS . 'css' . DS . 'splitview.css', array(), true );
			$css = splitview::replaceFonts( $css );
			echo $css;
		}
	),
	array(
		'pattern' => 'splitview.js', 
		'action'  => function() {
			header("Content-type: application/javascript");
			$js = tpl::load( kirby()->roots()->plugins() . DS . 'splitview' . DS . 'assets' . DS . 'js' . DS . 'splitview.js', array(), true );
			echo $js;
		}
	)
));