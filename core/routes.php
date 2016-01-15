<?php
class SplitbarRoutes {
	private static $assets;
	private static $route;

	// Init
	public static function init() {
		 self::$route = c::get('splitview.route', 'splitview');
		 self::$assets = kirby()->roots()->plugins() . DS . 'splitview' . DS . 'assets' . DS;
		 self::routes();
	}

	// Routes
	private static function routes() {
		kirby()->routes(array( 
			// Splitview tool
			array(
				'pattern' => self::$route, 
				'action'  => function() {
					echo SplitviewTool::html();
				}
			),

			// Css
			array(
				'pattern' => self::$route . '/assets/css/(:any)',
				'action'  => function($filename) {
					$path = self::$assets . 'css' . DS . $filename;
					return new Response( f::read($path), 'css' );
				}
			),

			// Js dist
			array(
				'pattern' => self::$route . '/assets/js/dist/(:any)',
				'action'  => function($filename) {
					$path = self::$assets . 'js' . DS . 'dist/' . $filename;
					return new Response( f::read($path), 'js' );
				}
			),

			// Js src
			array(
				'pattern' => self::$route . '/assets/js/src/(:any)',
				'action'  => function($filename) {
					$path = self::$assets . 'js' . DS . 'src/site/site.js';
					return new Response( f::read($path), 'js' );
				}
			),
			
			// Svg
			array(
				'pattern' => self::$route . '/assets/images/svg/(:any)', 
				'action'  => function($filename) {
					$path = self::$assets . 'images' . DS . 'svg' . DS . $filename;
					return new Response( f::read($path), 'svg' );
				}
			),

			// Svg inverted
			array(
				'pattern' => self::$route . '/assets/images/svg/inverted/(:any)', 
				'action'  => function($filename) {
					$path = self::$assets . 'images' . DS . 'svg' . DS . 'inverted' . DS . $filename;
					return new Response( f::read($path), 'svg' );
				}
			),
		));
	}
}

SplitbarRoutes::init();