<div class="splitview__wrap splitview--hide">
	<div class="splitview__menu">
		<div class="splitview__menu--panel">
			<div class="splitview__menu__item--full" title="Full panel view">
				<i class="fa fa-arrows-alt"></i><span>Panel</span>
			</div>
			<div class="splitview__menu__item--columns splitview--hide" title="Split preview">
				<i class="fa fa-columns"></i><span>Columns</span>
			</div>
		</div>
		<div class="splitview__menu--site">
			<div class="splitview__menu__item--full" title="Full site view">
				<i class="fa fa-arrows-alt"></i><span>Site</span>
			</div>
			<div class="splitview__menu__item--columns splitview--hide" title="Split preview">
				<i class="fa fa-columns"></i><span>Columns</span>
			</div>
			<div class="splitview__menu__item--refresh" title="Reload site view">
				<i class="fa fa-refresh"></i><span>Refresh</span>
			</div>
		</div>
		<div class="splitview__menu--close">
			<div class="splitview__menu__item--close" title="Close split preview">
				<i class="fa fa-times"></i>
			</div>
		</div>
	</div>
	<div class="splitview__columns">
		<div class="splitview__panel" data-splitview-url="<?php echo u(); ?>/panel/pages/<?php echo $page->uri(); ?>/edit"></div>
		<div class="splitview__site" data-splitview-url="<?php echo $page->url(); ?>"></div>
	</div>
</div>

<div class="splitview__message splitview--hide">Sorry! Splitview does not work in this resolution.</div>