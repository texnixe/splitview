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
				'pattern' => self::$route . '/css/(:any)',
				'action'  => function($slug) {
					$path = self::$assets . 'css' . DS . $slug . '.min.css';
					return new Response( f::read($path), 'css' );
				}
			),

			// Js dist
			array(
				'pattern' => self::$route . '/js/dist/(:any)',
				'action'  => function($slug) {
					$path = self::$assets . 'js' . DS . 'dist' . DS . $slug . '.min.js';
					return new Response( f::read($path), 'js' );
				}
			),

			// Js src
			array(
				'pattern' => self::$route . '/js/src/(:any)',
				'action'  => function($slug) {
					$path = self::$assets . 'js' . DS . 'src' . DS . $slug . DS . $slug . '.js';
					return new Response( f::read($path), 'js' );
				}
			),
			
			// Svg
			array(
				'pattern' => self::$route . '/svg/(:any)', 
				'action'  => function($slug) {
					$path = self::$assets . 'images' . DS . 'svg' . DS . $slug . '.svg';
					return new Response( f::read($path), 'svg' );
				}
			),

			// Svg inverted
			array(
				'pattern' => self::$route . '/svg/inverted/(:any)', 
				'action'  => function($slug) {
					$path = self::$assets . 'images' . DS . 'svg' . DS . 'inverted' . DS . $slug . '.svg';
					return new Response( f::read($path), 'svg' );
				}
			),
		));
	}
}

SplitbarRoutes::init();