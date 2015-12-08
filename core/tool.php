<?php
class SplitviewTool
{
	// Html
	public static function html() {
		$path = kirby()->roots()->plugins() . DS . 'splitview' . DS . 'templates' . DS . 'tool.php';
		return tpl::load($path, array(), true );
	}

	// JS url
	public static function js() {
		$url = u() . '/' . c::get('splitview.route', 'splitview') . '/assets/js/';
		$url .= ( c::get('splitview.debug', false) === true ) ? 'src/tool.js?time=' . time() : 'dist/tool.min.js';
		return $url;
	}

	// CSS url
	public static function css() {
		$url = u() . '/' . c::get('splitview.route', 'splitview') . '/assets/css/tool';
		$url .= ( c::get('splitview.debug', false) === true ) ? '.css?time=' . time() : '.min.css';
		return $url;
	}
}