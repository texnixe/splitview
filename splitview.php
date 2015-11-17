<?php
class splitview
{
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
		$html = static::html();
		return $html;
	}

	private static function html() {
		$html = '';
		if( c::get('splitview.html', true) === true ) {
			echo 'TEST';
			$html = tpl::load( kirby()->roots()->plugins() . DS . 'splitview' . DS . 'templates' . DS . 'html.php', array(), true );
			$html = ( c::get('splitview.minify', true) === true ) ? static::minifyHtml( $html ) : $html;
			$html = "\n\n<!-- Splitview # Start -->\n" . $html . "\n<!-- Splitview # End -->\n\n";
		}
		return $html;
	}

	public static function arg($key) {
		$test = c::get('splitview.' . $key, 'undefined');
		$js = '';

		if( $test !== 'undefined') {
			$test = ( $test === false ) ? 'false' : $test;
			$test = ( $test === true ) ? 'true' : $test;
			$test = ( is_string( $test ) ) ? "'" . $test . "'" : $test;
			$test = str_replace('alt+', '', strtolower( $test ) );
			$js = $key . ': ' . $test . ",\n";
		}

		return $js;
	}

	private static function minifyHtml($html) {
		return str_replace(array("\n", "\r", "\t"), array("", "", ""), $html);
	}

	protected function __construct() {}
	private function __clone() {}
	private function __wakeup()	{}
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

function splitview() {
	if( c::get('splitview.active', true) === true ) {
		return splitview::init();
	} else {
		return '';
	}
}