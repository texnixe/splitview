<?php
class SplitdataField extends BaseField{
	public function content() {
		$page = $this->page();
		$html = '';
		$html .= '<div class="splitview__data" data-splitview-id="' .$page->uri() . '"></div>';
		return $html;
	}
	
}