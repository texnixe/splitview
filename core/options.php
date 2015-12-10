<?php
class splitviewOptions {
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
			if( c::get('splitview.' . $key) !== null ) {
				$options[$key] = c::get('splitview.' . $key);
			}
		}
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