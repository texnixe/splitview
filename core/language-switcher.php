<?php
class splitviewLangaugeSwitcher {
	public static $accepted = array('en', 'sv');
	public static $default = 'en';
	public static $current = '';
	public static $dir = '';

	public static function init() {
		self::$dir = __DIR__ . DS . '..' . DS . 'languages';
		self::set();
		if( self::has() ) {
			require_once self::$dir . DS . self::$current . '.php';
		} else {
			require_once self::$dir . DS . self::$default . '.php';
		}
	}

	public static function set() {
		self::$current = visitor::acceptedLanguageCode();
	}

	public static function has() {
		if( in_array( self::$current, self::$accepted ) ) {
			return true;
		}
	}
}

splitviewLangaugeSwitcher::init();