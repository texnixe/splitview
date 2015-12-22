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
			// Splitview page
			array(
				'pattern' => self::$route, 
				'action'  => function() {
					echo SplitviewTool::html();
				}
			),
			array(
				'pattern' => self::$route . '/assets/css/tool.css', 
				'action'  => function() {
					$path = self::$assets . 'css' . DS . 'tool.css';
					return new Response( f::read($path), 'css' );
				}
			),
			array(
				'pattern' => self::$route . '/assets/css/tool.min.css', 
				'action'  => function() {
					$path = self::$assets . 'css' . DS . 'tool.min.css';
					return new Response( f::read($path), 'css' );
				}
			),
			array(
<<<<<<< HEAD
				'pattern' => self::$route . '/assets/js/dist/tool.js', 
				'action'  => function() {
					$path = self::$assets . 'js' . DS . 'dist/tool.js';
=======
				'pattern' => self::$route . '/assets/js/src/tool.js', 
				'action'  => function() {
					$path = self::$assets . 'js' . DS . 'src/tool.js';
>>>>>>> origin/master
					return new Response( f::read($path), 'js' );
				}
			),
			array(
				'pattern' => self::$route . '/assets/js/dist/tool.min.js', 
				'action'  => function() {
					$path = self::$assets . 'js' . DS . 'dist/tool.min.js';
					return new Response( f::read($path), 'js' );
				}
			),
			array(
				'pattern' => self::$route . '/assets/js/src/site.js', 
				'action'  => function() {
<<<<<<< HEAD
					$path = self::$assets . 'js' . DS . 'src/site/site.js';
=======
					$path = self::$assets . 'js' . DS . 'src/site.js';
>>>>>>> origin/master
					return new Response( f::read($path), 'js' );
				}
			),
			array(
				'pattern' => self::$route . '/assets/js/dist/site.min.js', 
				'action'  => function() {
					$path = self::$assets . 'js' . DS . 'dist/site.min.js';
					return new Response( f::read($path), 'js' );
				}
			),
			// Font Awesome
			array(
				'pattern' => self::$route . '/assets/fonts/font-awesome.woff', 
				'action'  => function() {
					$path = self::$assets . 'fonts' . DS . 'font-awesome-4.5.0' . DS . 'fontawesome-webfont.woff';
					return new Response( f::read($path), 'woff' );
				}
			),
			// Font - Source Sans Pro
			array(
				'pattern' => self::$route . '/assets/fonts/source-sans-pro.woff', 
				'action'  => function() {
					$path = self::$assets . 'fonts' . DS . 'source-sans-pro' . DS . 'SourceSansPro-Regular.otf.woff';
					return new Response( f::read($path), 'woff' );
				}
			)
		));
	}
}

SplitbarRoutes::init();