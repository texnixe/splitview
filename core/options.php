<?php
class splitviewOptions {
<<<<<<< HEAD
	// Options in php
	public static function options( $keys ) {
		$options = array();
		foreach( $keys as $key ) {
=======
	// Option keys
	public static $keys = array(
		'active',
		'debug',
		'memory',
		'orientation',
		'panel',
		'shortcut',
		'route',
		'view',
	);

	// Options in php
	public static function options() {
		$options = array();
		foreach( self::$keys as $key ) {
>>>>>>> origin/master
			if( c::get('splitview.' . $key) !== null ) {
				$options[$key] = c::get('splitview.' . $key);
			}
		}
<<<<<<< HEAD
		return $options;
	}

	// Options get replacement
	public static function optionsGetReplacement( $keys, $options ) {
		foreach( $keys as $key ) {
			if( ! empty( get($key) ) ) {
				$new_options[$key] = get($key);
			} else {
				if( isset( $options[$key] ) ) {
					$value = $options[$key];
					$new_options[$key] = $value;
				}
			}
		}
		return $new_options;
	}

	// Args in javascript
	public static function arrayToJavascriptOptions( $array ) {
		$args = '';
		if( ! empty( $array ) ) {
			foreach( $array as $key => $option ) {
				$args .= $key . ": " . $option . ', ';
			}
			return substr($args, 0, -2);
		}
	}

	// Php values to javascript values
	public static function phpValuesToJavascriptValues( $options_php ) {
		foreach( $options_php as $key => $option ) {
=======
		$options = array_merge($options, self::extra() );

		return $options;
	}

	// Extra generated options in php
	private static function extra() {
		$extra = array(
			'page.slug' => ( page()->isHomePage() !== true ) ? page()->uri() : '',
			'admin.slug' => page()->uri(),
			'root.url' => u()
		);
		return $extra;
	}

	// Javascript options from php
	public static function javascript() {
		foreach( self::options() as $key => $option ) {
>>>>>>> origin/master
			$option = ( is_string( $option ) ) ? "'" . $option . "'" : $option;
			$option = ( $option === false ) ? 'false' : $option;
			$option = ( $option === true ) ? 'true' : $option;
			$option = str_replace('alt+', '', strtolower( $option ) );
			$key = str_replace('.', '_', $key );
			$options[$key] = $option;
		}
		return $options;
	}
}