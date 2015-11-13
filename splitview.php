<?php
function splitview() {
	if( site()->user() && c::get('splitview.active', true) === true  ) {
		$splitView = new splitView;
		return $splitView->get();
	}
}

class splitView {
	public $paths;
	public $urls;

	public function __construct() {
		$this->paths();
		$this->urls();
	}

	public function paths() {
		$this->paths = new stdClass();
		$this->paths->splitview = kirby()->roots()->plugins() . DS . 'splitview' . DS;
		$this->paths->templates = $this->paths->splitview . 'templates' . DS;
	}

	public function urls() {
		$this->urls = new stdClass();
		$this->urls->fonts = kirby()->urls()->index() . '/panel/assets/fonts/';
	}

	public function get() {
		$html = '';
		$html .= $this->replaceFonts( $this->css() );
		$html .= $this->minifyHtml( $this->html() );
		$html .= $this->replaceShortcut( $this->js() );
		$html .= $this->minifyHtml( $this->jsScript() );

		$html = "\n\n<!-- Splitview # Start -->\n" . $html . "\n<!-- Splitview # End -->\n\n";
		return $html;
	}
	private function css() {
		if( c::get('splitview.css', true) === true )
			return '<style>' .  tpl::load( $this->paths->splitview . 'assets' . DS . 'css' . DS . 'splitview.css', '', true ) . '</style>';
	}

	private function js() {
		if( c::get('splitview.js', true) === true )
			return '<script>' .  tpl::load( $this->paths->splitview . 'assets' . DS . 'js' . DS . 'splitview.min.js', '', true ) . '</script>';
	}

	private function jsScript() {
		if( c::get('splitview.script', true) === true ) {
			$memory = ( c::get('splitview.memory', true) === true ) ? 'true' : 'false';

			return tpl::load( $this->paths->templates . 'script.php', array(
				'memory' => $memory
			),true );
		}
	}

	private function html() {
		if( c::get('splitview.html', true) === true )
			return tpl::load( $this->paths->templates . 'html.php', array(), true );
	}

	private function replaceFonts( $html ) {
		$fonts = array(
			array('{{font-awesome}}', $this->urls->fonts . 'fontawesome-webfont.woff?v=4.2'),
			array('{{source-sans-pro-400}}', $this->urls->fonts . 'sourcesanspro-400.woff'),
		);
		foreach( $fonts as $font ) {
			$html = str_ireplace($font[0], $font[1], $html);
		}
		return $html;
	}

	private function replaceShortcut($html) {
		return str_ireplace('{{shortcut}}', c::get('splitview.shortcut', 's'), $html);
	}

	private function minifyHtml($html) {
		return str_replace(array("\n", "\r", "\t"), array("", "", ""), $html);
	}
}