<?php
if( c::get('splitview.active', true ) === true && ( c::get('splitview.debug', false) === true || site()->user() ) ) {
	require_once 'core/routes.php';
	require_once 'core/options.php';
	require_once 'core/language-switcher.php';
	require_once 'core/site.php';
	require_once 'core/tool.php';
} else {
	function splitview() {}
}